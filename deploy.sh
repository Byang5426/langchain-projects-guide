#!/bin/bash

# LangChain 项目推荐指南 - 快速部署脚本
# 使用方法：./deploy.sh <server-ip> <domain-name> <username>

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查参数
if [ $# -lt 3 ]; then
    echo -e "${RED}使用方法: ./deploy.sh <server-ip> <domain-name> <username>${NC}"
    echo "示例: ./deploy.sh 123.45.67.89 langchain-guide.com ubuntu"
    exit 1
fi

SERVER_IP=$1
DOMAIN=$2
USERNAME=$3
PROJECT_DIR="/home/$USERNAME/langchain-projects-guide"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}LangChain 项目推荐指南 - 快速部署${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "服务器 IP: $SERVER_IP"
echo "域名: $DOMAIN"
echo "用户名: $USERNAME"
echo ""

# 步骤 1：检查本地环境
echo -e "${YELLOW}[1/5] 检查本地环境...${NC}"
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}pnpm 未安装，请先安装 pnpm${NC}"
    exit 1
fi
echo -e "${GREEN}✓ pnpm 已安装${NC}"

# 步骤 2：本地构建
echo -e "${YELLOW}[2/5] 本地构建...${NC}"
pnpm install
pnpm build
echo -e "${GREEN}✓ 构建完成${NC}"

# 步骤 3：上传文件到服务器
echo -e "${YELLOW}[3/5] 上传文件到服务器...${NC}"
ssh $USERNAME@$SERVER_IP "mkdir -p $PROJECT_DIR"
scp -r dist/public/* $USERNAME@$SERVER_IP:$PROJECT_DIR/
scp nginx.conf $USERNAME@$SERVER_IP:$PROJECT_DIR/
scp .htaccess $USERNAME@$SERVER_IP:$PROJECT_DIR/
echo -e "${GREEN}✓ 文件上传完成${NC}"

# 步骤 4：在服务器上配置 Nginx
echo -e "${YELLOW}[4/5] 配置 Nginx...${NC}"
ssh $USERNAME@$SERVER_IP << EOF
    # 创建 Nginx 配置
    sudo tee /etc/nginx/sites-available/langchain-guide > /dev/null << 'NGINX'
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    root $PROJECT_DIR;
    
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json;
    gzip_min_length 1000;
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.html?$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    location / {
        try_files \$uri \$uri/ /index.html;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
    }
    
    error_page 404 /index.html;
}
NGINX
    
    # 启用站点
    sudo ln -sf /etc/nginx/sites-available/langchain-guide /etc/nginx/sites-enabled/
    
    # 禁用默认站点
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # 测试配置
    sudo nginx -t
    
    # 重启 Nginx
    sudo systemctl restart nginx
    
    echo "Nginx 配置完成"
EOF
echo -e "${GREEN}✓ Nginx 配置完成${NC}"

# 步骤 5：配置 HTTPS（可选）
echo -e "${YELLOW}[5/5] 配置 HTTPS (Let's Encrypt)...${NC}"
ssh $USERNAME@$SERVER_IP << EOF
    # 检查 Certbot 是否安装
    if ! command -v certbot &> /dev/null; then
        echo "安装 Certbot..."
        sudo apt-get update
        sudo apt-get install -y certbot python3-certbot-nginx
    fi
    
    # 获取证书
    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN
    
    echo "HTTPS 配置完成"
EOF
echo -e "${GREEN}✓ HTTPS 配置完成${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "访问您的网站: ${YELLOW}https://$DOMAIN${NC}"
echo ""
echo "后续更新步骤："
echo "1. 在本地修改代码"
echo "2. 运行: pnpm build"
echo "3. 运行: ./deploy.sh $SERVER_IP $DOMAIN $USERNAME"
echo ""

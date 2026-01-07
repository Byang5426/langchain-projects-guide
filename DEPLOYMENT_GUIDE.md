# LangChain 项目推荐指南 - 部署指南

本文档提供了将 LangChain 项目推荐指南部署到自己服务器的完整步骤。

## 📋 前置要求

- Node.js 22+ 或 Docker
- Nginx 或 Apache Web 服务器
- 一个有效的域名
- SSH 访问您的服务器

---

## 方案 1：使用 Docker（推荐，最简单）

### 步骤 1：准备服务器

```bash
# 登录您的服务器
ssh user@your-server.com

# 安装 Docker 和 Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 验证安装
docker --version
docker-compose --version
```

### 步骤 2：上传项目文件

```bash
# 在本地机器上，从 Manus Management UI 下载项目文件
# 或使用 Git 克隆（如果已推送到 GitHub）

# 上传到服务器
scp -r langchain-projects-guide user@your-server.com:/home/user/
```

### 步骤 3：构建并运行 Docker 容器

```bash
# 进入项目目录
cd /home/user/langchain-projects-guide

# 构建 Docker 镜像
docker-compose build

# 启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f
```

### 步骤 4：配置域名和反向代理

如果您想使用自定义域名和 HTTPS，需要配置反向代理：

```bash
# 编辑 Nginx 配置
sudo nano /etc/nginx/sites-available/langchain-guide

# 添加以下内容：
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/langchain-guide /etc/nginx/sites-enabled/

# 测试 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 步骤 5：配置 HTTPS（使用 Let's Encrypt）

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期（通常已配置）
sudo systemctl enable certbot.timer
```

### 常用 Docker 命令

```bash
# 查看运行中的容器
docker ps

# 查看容器日志
docker-compose logs -f

# 停止容器
docker-compose down

# 重启容器
docker-compose restart

# 更新代码后重新构建
docker-compose build --no-cache
docker-compose up -d
```

---

## 方案 2：使用 Nginx + 手动部署

### 步骤 1：在本地构建

```bash
# 在本地机器上
cd langchain-projects-guide

# 安装依赖
pnpm install

# 构建生产版本
pnpm build

# 构建后的文件在 dist/public 目录中
```

### 步骤 2：上传到服务器

```bash
# 上传构建后的文件
scp -r dist/public/* user@your-server.com:/var/www/langchain-guide/

# 上传 Nginx 配置
scp nginx.conf user@your-server.com:/etc/nginx/sites-available/langchain-guide
```

### 步骤 3：配置 Nginx

```bash
# 登录服务器
ssh user@your-server.com

# 编辑 Nginx 配置文件
sudo nano /etc/nginx/sites-available/langchain-guide

# 修改以下内容：
# - server_name：改为您的域名
# - root：改为实际的文件路径（例如 /var/www/langchain-guide）

# 启用站点
sudo ln -s /etc/nginx/sites-available/langchain-guide /etc/nginx/sites-enabled/

# 禁用默认站点（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 步骤 4：配置 HTTPS

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 验证 HTTPS 是否工作
curl https://your-domain.com
```

---

## 方案 3：使用 Apache + 手动部署

### 步骤 1：在本地构建（同上）

```bash
pnpm build
```

### 步骤 2：上传到服务器

```bash
# 上传构建后的文件
scp -r dist/public/* user@your-server.com:/var/www/langchain-guide/

# 上传 .htaccess 文件
scp .htaccess user@your-server.com:/var/www/langchain-guide/
```

### 步骤 3：配置 Apache

```bash
# 登录服务器
ssh user@your-server.com

# 启用 mod_rewrite
sudo a2enmod rewrite

# 编辑 Apache 虚拟主机配置
sudo nano /etc/apache2/sites-available/langchain-guide.conf

# 添加以下内容：
```

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    
    DocumentRoot /var/www/langchain-guide
    
    <Directory /var/www/langchain-guide>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/langchain-error.log
    CustomLog ${APACHE_LOG_DIR}/langchain-access.log combined
</VirtualHost>
```

```bash
# 启用站点
sudo a2ensite langchain-guide

# 禁用默认站点
sudo a2dissite 000-default

# 测试配置
sudo apache2ctl configtest

# 重启 Apache
sudo systemctl restart apache2
```

### 步骤 4：配置 HTTPS

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-apache

# 获取证书
sudo certbot --apache -d your-domain.com -d www.your-domain.com
```

---

## 常见问题排查

### 问题 1：页面刷新后出现 404 错误

**原因**：Web 服务器没有正确配置 SPA 路由

**解决方案**：
- 对于 Nginx：确保 `try_files $uri $uri/ /index.html;` 配置正确
- 对于 Apache：确保 `.htaccess` 文件在正确的位置，且 `mod_rewrite` 已启用

### 问题 2：localStorage 数据丢失

**原因**：通常是浏览器隐私模式或跨域问题

**解决方案**：
- 确保在普通浏览模式下使用
- 检查浏览器控制台是否有错误信息

### 问题 3：样式或图片加载失败

**原因**：资源路径错误或 CORS 问题

**解决方案**：
- 检查浏览器开发者工具的 Network 标签
- 确保所有资源都正确复制到服务器
- 检查 Web 服务器是否正确提供静态文件

### 问题 4：性能缓慢

**解决方案**：
- 启用 gzip 压缩
- 配置正确的缓存头
- 使用 CDN 加速
- 检查 Web 服务器日志

---

## 更新部署

当您更新代码时，按照以下步骤重新部署：

### 使用 Docker

```bash
cd /home/user/langchain-projects-guide

# 拉取最新代码（如果使用 Git）
git pull

# 重新构建并启动
docker-compose build --no-cache
docker-compose up -d
```

### 使用 Nginx/Apache

```bash
# 在本地重新构建
pnpm build

# 上传新文件
scp -r dist/public/* user@your-server.com:/var/www/langchain-guide/

# 清除浏览器缓存或等待缓存过期
```

---

## 性能优化建议

1. **启用 HTTP/2**：在 Nginx 中使用 `listen 443 ssl http2;`
2. **启用 Brotli 压缩**：比 gzip 更高效
3. **使用 CDN**：如 Cloudflare、Akamai 等
4. **启用 Service Worker**：实现离线访问
5. **代码分割**：减少初始加载时间

---

## 安全建议

1. **启用 HTTPS**：使用 Let's Encrypt 获取免费证书
2. **配置安全头**：
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Content-Security-Policy`
3. **定期更新**：保持 Web 服务器和依赖项最新
4. **监控日志**：定期检查访问和错误日志
5. **备份数据**：定期备份用户进度数据

---

## 获取帮助

如果遇到问题，请检查：
1. Web 服务器日志：`/var/log/nginx/error.log` 或 `/var/log/apache2/error.log`
2. 浏览器开发者工具：F12 打开，查看 Console 和 Network 标签
3. Docker 日志：`docker-compose logs -f`

---

## 许可证

本项目遵循 MIT 许可证。

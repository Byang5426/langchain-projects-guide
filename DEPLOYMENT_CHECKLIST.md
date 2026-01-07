# 部署清单和快速参考

## 🚀 快速开始（3 分钟）

### 使用 Docker（最简单）

```bash
# 1. 上传项目到服务器
scp -r langchain-projects-guide user@your-server.com:/home/user/

# 2. 在服务器上运行
ssh user@your-server.com
cd /home/user/langchain-projects-guide
docker-compose up -d

# 3. 访问 http://your-server-ip:3000
```

---

## 📋 部署前检查清单

- [ ] 服务器 SSH 访问正常
- [ ] 服务器已安装 Node.js 22+ 或 Docker
- [ ] 域名已注册并指向服务器 IP
- [ ] 防火墙已开放 80 和 443 端口
- [ ] 有 sudo 权限或 root 访问

---

## 🔧 部署方案对比

| 方案 | 难度 | 优点 | 缺点 |
|------|------|------|------|
| **Docker** | ⭐ 简单 | 一键部署、易于更新、隔离环境 | 需要 Docker 知识 |
| **Nginx** | ⭐⭐ 中等 | 轻量级、高性能、广泛支持 | 需要手动配置 |
| **Apache** | ⭐⭐ 中等 | 功能完整、易于管理 | 资源占用较多 |

---

## 📦 文件说明

| 文件 | 用途 |
|------|------|
| `dist/public/` | 生产版本文件（部署这个文件夹） |
| `nginx.conf` | Nginx 配置文件 |
| `.htaccess` | Apache 配置文件 |
| `Dockerfile` | Docker 镜像定义 |
| `docker-compose.yml` | Docker 容器编排 |
| `deploy.sh` | 自动部署脚本 |
| `DEPLOYMENT_GUIDE.md` | 详细部署指南 |

---

## 🎯 部署步骤速查

### 方案 1：Docker（推荐）

```bash
# 1. 上传项目
scp -r . user@server:/home/user/langchain-guide

# 2. 部署
ssh user@server
cd /home/user/langchain-guide
docker-compose up -d

# 3. 配置域名（可选）
# 编辑 docker-compose.yml，改变端口映射
# 或在服务器上配置 Nginx 反向代理
```

### 方案 2：Nginx

```bash
# 1. 本地构建
pnpm build

# 2. 上传文件
scp -r dist/public/* user@server:/var/www/langchain-guide/

# 3. 配置 Nginx
ssh user@server
sudo nano /etc/nginx/sites-available/langchain-guide
# 复制 nginx.conf 内容，修改 server_name 和 root

# 4. 启用并重启
sudo ln -s /etc/nginx/sites-available/langchain-guide /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 5. 配置 HTTPS
sudo certbot --nginx -d your-domain.com
```

### 方案 3：Apache

```bash
# 1. 本地构建
pnpm build

# 2. 上传文件
scp -r dist/public/* user@server:/var/www/langchain-guide/
scp .htaccess user@server:/var/www/langchain-guide/

# 3. 配置 Apache
ssh user@server
sudo a2enmod rewrite
sudo nano /etc/apache2/sites-available/langchain-guide.conf
# 配置虚拟主机

# 4. 启用并重启
sudo a2ensite langchain-guide
sudo apache2ctl configtest
sudo systemctl restart apache2

# 5. 配置 HTTPS
sudo certbot --apache -d your-domain.com
```

---

## 🔐 HTTPS 配置

### 使用 Let's Encrypt（免费）

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx  # 或 python3-certbot-apache

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期（通常已配置）
sudo systemctl enable certbot.timer
```

### 验证 HTTPS

```bash
curl https://your-domain.com
# 应该返回 HTML 内容，无 SSL 错误
```

---

## 🐛 常见问题速查

### 问题：页面刷新后 404

**Nginx 解决方案**：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache 解决方案**：
确保 `.htaccess` 在 `dist/public/` 目录中

### 问题：样式/图片加载失败

检查：
```bash
# 文件是否存在
ls -la /var/www/langchain-guide/

# Nginx 日志
sudo tail -f /var/log/nginx/error.log

# Apache 日志
sudo tail -f /var/log/apache2/error.log
```

### 问题：localStorage 不工作

检查：
- 浏览器是否在隐私模式
- 浏览器控制台是否有错误
- 域名是否正确配置

### 问题：性能缓慢

启用压缩和缓存：
```bash
# Nginx 已配置在 nginx.conf 中
# Apache 已配置在 .htaccess 中
```

---

## 📊 性能优化建议

```bash
# 1. 启用 Brotli 压缩（比 gzip 更好）
# Nginx: 安装 ngx_brotli 模块
# Apache: 安装 mod_brotli

# 2. 启用 HTTP/2
# Nginx: listen 443 ssl http2;
# Apache: Protocols h2 http/1.1

# 3. 启用 Service Worker
# 已在项目中配置

# 4. 使用 CDN
# 推荐：Cloudflare、Akamai、阿里云 CDN
```

---

## 🔄 更新部署

### 更新代码后

```bash
# 本地更新
git pull  # 或手动编辑文件
pnpm build

# 上传新文件
scp -r dist/public/* user@server:/var/www/langchain-guide/

# 或使用 Docker
docker-compose build --no-cache
docker-compose up -d
```

---

## 📞 获取帮助

1. **查看日志**
   ```bash
   # Nginx
   sudo tail -f /var/log/nginx/error.log
   
   # Apache
   sudo tail -f /var/log/apache2/error.log
   
   # Docker
   docker-compose logs -f
   ```

2. **检查浏览器**
   - 按 F12 打开开发者工具
   - 查看 Console 标签中的错误
   - 查看 Network 标签中的请求状态

3. **测试连接**
   ```bash
   # 测试 HTTP
   curl http://your-domain.com
   
   # 测试 HTTPS
   curl https://your-domain.com
   
   # 测试 DNS
   nslookup your-domain.com
   ```

---

## 📝 部署记录模板

```markdown
# 部署记录

**日期**：2024-01-07
**版本**：255595bd
**方案**：Docker
**域名**：your-domain.com
**状态**：✅ 成功

## 步骤
1. ✅ 上传项目文件
2. ✅ 构建 Docker 镜像
3. ✅ 启动容器
4. ✅ 配置 Nginx 反向代理
5. ✅ 配置 HTTPS

## 验证
- ✅ HTTP 访问正常
- ✅ HTTPS 访问正常
- ✅ localStorage 工作正常
- ✅ 进度追踪功能正常

## 备注
无
```

---

## 🎓 学习资源

- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Apache 官方文档](https://httpd.apache.org/docs/)
- [Docker 官方文档](https://docs.docker.com/)
- [Let's Encrypt 官方文档](https://letsencrypt.org/docs/)
- [React 部署指南](https://create-react-app.dev/deployment/)

---

**最后更新**：2024-01-07
**维护者**：LangChain Projects Guide Team

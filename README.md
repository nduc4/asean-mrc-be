# ASEAN-MRC TECHNOLOGY COMPETITION 2024

1. [Cảnh báo](README.md#cảnh-báo)
2. [Hướng dẫn cài đặt](README.md#hướng-dẫn-cài-đặt)
3. [Hướng dẫn chạy chương trình](README.md#hướng-dẫn-chạy-chương-trình)

## Cảnh báo

1. Chương trình được phát triển và hoạt động trên hệ điều hành Linux, distro Fedora 40, chưa kiểm định trên các distro khác như Debian-based (Ubuntu, Mint,...), Arch-based, Windows (10 - 11)

2. Yêu cầu: phiên bản `Nodejs v20.16.0`, `npm v10.8.1` trở lên hoặc phiên bản `LTS`

3. Chương trình có 2 file môi trường đó là: `.env.development` và `.env.production`. Vui lòng tự thêm `MONGODB_URI`, có thể tự chỉnh sửa `PORT`, `JWT_TOKEN` theo ý muốn. **KHÔNG ĐƯỢC PHÉP CHỈNH SỬA `NODE_ENV`**

## Hướng dẫn cài đặt

### Cài đặt Nodejs (trên Linux)

```bash
# Cài đặt nvm (Node Version Manager) 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Cài đặt nodejs (khởi động lại terminal trước khi chạy)
nvm install 20
```

Chi tiết [tại đây](https://nodejs.org/en/download/package-manager)

### Cài đặt chương trình

```bash
git clone https://github.com/nduc4/asean-mrc-be.git
cd asean-mrc-be
npm i
```

## Hướng dẫn chạy chương trình

### Chế độ development

```bash
npm run start 
# or
NODE_ENV=development npm run start
```

### Chế độ production
```bash
NODE_ENV=production npm run start:prod
```

Truy cập vào `/docs` để mở swagger

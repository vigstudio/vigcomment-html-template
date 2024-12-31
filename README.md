# Template Comment System

> Một hệ thống comment đơn giản nhưng mạnh mẽ, được tạo ra với tình yêu và sự tỉ mỉ ❤️

Template này được tạo ra bởi [v0.dev](https://v0.dev/) - một công cụ AI của Vercel để tạo ra các UI components. Và Cursor AI để tối ưu code.

Tui chỉ là người viết prompt và tối ưu code để phù hợp với nhu cầu của tui.

## Tại sao nên dùng template này?

- 🎨 **Thiết kế tối giản nhưng đẹp mắt**: Giao diện được thiết kế theo phong cách modern minimal
- 🚀 **Nhẹ và nhanh**: Không phụ thuộc vào các framework nặng nề
- 🎯 **Dễ tích hợp**: Chỉ cần vài dòng code là có thể tích hợp vào website của bạn
- 💪 **Mạnh mẽ**: Đầy đủ các tính năng cần thiết cho một hệ thống comment
- 🌈 **Dễ tùy biến**: Sử dụng CSS variables để dễ dàng thay đổi giao diện

## Demo

Xem demo tại đây: [Demo Link](#) _(coming soon)_

## Tính Năng

### 1. Giao Diện

- Thiết kế hiện đại, responsive trên mọi thiết bị
- Hỗ trợ Dark mode/Light mode
- Hiển thị avatar và thông tin người dùng
- Hỗ trợ markdown trong nội dung bình luận
- Phân trang đẹp mắt với nút prev/next và số trang

### 2. Tương Tác

- Upvote/Downvote bình luận
- Trả lời bình luận (hỗ trợ đến 3 cấp)
- Thêm emoji vào nội dung bình luận
- Thêm reaction cho bình luận (👍, ❤️, 😄, 🎉,...)
- Chỉnh sửa và xóa bình luận
- Báo cáo bình luận không phù hợp

### 3. Chức Năng Reaction

- Nút reaction nhỏ gọn bên cạnh nút Reply
- Hiển thị emoji picker khi click vào nút reaction
- Hỗ trợ nhiều loại reaction khác nhau
- Hiển thị số lượng reaction cho mỗi emoji
- Reaction có background solid khi người dùng đã thêm
- Tự động wrap reactions trên mobile

## Cài Đặt

1. Clone repository:

```bash
git clone https://github.com/your-username/comment-system.git
```

2. Thêm các file CSS và JS vào project:

```html
<link rel="stylesheet" href="style.css" />
<script src="script.js"></script>
```

3. Thêm thư viện emoji-picker:

```html
<script
  src="https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js"
  type="module"
></script>
```

4. Sử dụng HTML template:

```html
<div class="vig-comment-container">
  <!-- Comment form -->
  <!-- Comment list -->
</div>
```

## Sử Dụng

### Khởi tạo

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Code khởi tạo sẽ tự động chạy
});
```

### Tùy chỉnh theme

```css
:root {
  --vig-comment-bg: #ffffff;
  --vig-comment-text: #1a1b1e;
  /* Thêm các biến CSS khác */
}
```

## Đóng Góp

Mọi đóng góp đều được chào đón! Hãy tạo pull request hoặc báo cáo issues nếu bạn phát hiện lỗi.

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

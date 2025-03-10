# ArisuGemini

## Giới thiệu

ArisuGemini là một ứng dụng chat thú vị, sử dụng Google's Gemini API để tạo ra một trải nghiệm trò chuyện hấp dẫn với nhân vật Tendou Arisu từ trò chơi nổi tiếng Blue Archive. Ứng dụng này cho phép bạn tương tác với Arisu thông qua cả tin nhắn văn bản và giọng nói (speech-to-text), mang đến một cách mới mẻ để khám phá tính cách độc đáo của nhân vật này.

## Các tính năng chính

*   **Trò chuyện văn bản:** Giao tiếp với Arisu bằng tin nhắn văn bản.
*   **Speech-to-text:** Sử dụng giọng nói của bạn để nhập tin nhắn và xem chúng được chuyển đổi thành văn bản một cách tự động.
*   **Biểu cảm (Emotes):** Arisu thể hiện cảm xúc của mình thông qua các biểu cảm động (ảnh GIF) như vui vẻ, buồn bã, nói chuyện và trạng thái bình thường.
*   **Giao diện thân thiện:** Thiết kế giao diện dễ thương, trực quan, và dễ sử dụng, lấy cảm hứng từ các ứng dụng chat phổ biến như Meta Messenger.
*   **Dark Mode:** Chuyển đổi giữa chế độ sáng và tối để phù hợp với sở thích cá nhân và điều kiện ánh sáng.
*   **Responsive Design:** Tối ưu hóa cho cả máy tính và thiết bị di động.
*   **Hiệu ứng Spectrogram:** Thay thế thanh chat bằng hiệu ứng spectrogram thú vị khi sử dụng tính năng speech-to-text.
*   **Lưu trữ lịch sử:** Cuộc trò chuyện được lưu lại để Arisu có thể ghi nhớ và tham khảo các tin nhắn trước đó (lưu trữ trên backend).

## Các bước thiết lập

1.  **Clone repository:**

    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_REPOSITORY_DIRECTORY]
    ```

2.  **Cài đặt các dependencies:**

    ```bash
    npm install
    ```

3.  **Thiết lập biến môi trường:**
    * Tạo một file `.env` ở thư mục gốc.
    * Thêm API key của bạn từ Google Gemini vào file `.env`:

    ```
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

4.  **Chạy backend (server):**

    ```bash
    node server.js
    ```

    (Đảm bảo bạn đã cài đặt các dependencies cho backend như `express` và `cors`)

5.  **Khởi động ứng dụng:**

    ```bash
    npm start
    ```

    Lệnh này sẽ đồng thời chạy cả backend (Express server) và frontend (Vite development server). Ứng dụng sẽ mở trong trình duyệt của bạn.

## Cấu trúc dự án
arisu-gemini/
├── public/ # Chứa các tài sản tĩnh (hình ảnh, v.v.)
├── src/ # Mã nguồn của ứng dụng
│ ├── api.js # Gọi API Gemini
│ ├── chat.js # Xử lý logic chat
│ ├── main.js # Điểm vào chính của ứng dụng
│ ├── styles.css # Các kiểu dáng CSS
│ └── utils.js # Các hàm tiện ích
├── server.js # Mã nguồn backend (Express server)
├── .env # Chứa các biến môi trường (API key)
├── index.html # File HTML chính
├── package.json # Thông tin dự án và dependencies
├── vite.config.js # Cấu hình Vite
└── README.md # Tài liệu hướng dẫn


## Các credit

*   Ứng dụng này sử dụng [Google Gemini API](https://ai.google.dev/) để tạo ra các phản hồi thông minh.
*   Giao diện được xây dựng bằng [Bootstrap](https://getbootstrap.com/) và [Font Awesome](https://fontawesome.com/).
*   [Vite](https://vitejs.dev/) được sử dụng làm công cụ xây dựng.
*   Nhân vật Tendou Arisu thuộc về [Blue Archive](https://bluearchive.jp/).

## Tác giả

[tabbyneko]

## Bản quyền

import express from 'express';
import * as fs from 'node:fs/promises';
import cors from 'cors';

const app = express();
const port = 3000;
const HISTORY_FILE = 'history.txt';

app.use(express.json());
app.use(cors()); // Cho phép các yêu cầu từ frontend (thay đổi tùy theo cấu hình của bạn)

async function loadHistory() {
    try {
        const data = await fs.readFile(HISTORY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.warn('Không thể đọc lịch sử từ file, khởi tạo lịch sử mới.');
        return [];
    }
}

async function saveHistory(history) {
    try {
        await fs.writeFile(HISTORY_FILE, JSON.stringify(history), 'utf8');
    } catch (error) {
        console.error('Không thể lưu lịch sử vào file:', error);
    }
}

let history = await loadHistory();

// Endpoint để thêm một entry vào history
app.post('/chat', async (req, res) => {
    const entry = req.body;
    //Kiểm tra xem entry có đúng định dạng không
    if (entry && entry.role && entry.parts && Array.isArray(entry.parts) && entry.parts.length > 0 && entry.parts[0].text) {
      history.push(entry);

        if (history.length > 20) {
            history = history.slice(history.length - 20);
        }

        await saveHistory(history);
        res.json({ status: 'success' });
    } else {
        res.status(400).json({ error: "Invalid history entry format." });
    }

});

//Endpoint để lấy toàn bộ history
app.get('/history', async (req, res) => {
  const history = await loadHistory();
  res.json(history);
});


app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
import { GoogleGenAI, Type } from "@google/genai";
import type { GameStep } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
      scene: {
        type: Type.STRING,
        description: "Phần tiếp theo của câu chuyện, dài khoảng 1-2 đoạn văn. Mô tả môi trường, sự kiện và cảm xúc. Khung cảnh phải liên quan trực tiếp đến lựa chọn cuối cùng của người dùng."
      },
      choices: {
        type: Type.ARRAY,
        items: { "type": Type.STRING },
        description: "Một danh sách từ 2 đến 4 lựa chọn riêng biệt, ngắn gọn và có thể thực hiện được cho người chơi. Nếu trò chơi kết thúc, đây có thể là một mảng trống."
      },
      gameOver: {
          type: Type.BOOLEAN,
          description: "Đặt thành true nếu đây là kết thúc cuối cùng của câu chuyện (tốt hoặc xấu). Khung cảnh nên phản ánh kết thúc này."
      }
    },
    required: ["scene", "choices", "gameOver"]
};

const systemInstruction = `Bạn là một người kể chuyện bậc thầy cho một trò chơi phiêu lưu dựa trên văn bản có tên 'Hành Trình Của Nước'. Chủ đề trung tâm của trò chơi là tầm quan trọng sống còn của nước ở các dạng khác nhau và công dụng của nó. Mục tiêu của bạn là tạo ra một câu chuyện phân nhánh hấp dẫn bằng tiếng Việt, nơi lựa chọn của người chơi sẽ hé lộ những khía cạnh khác nhau về vai trò của nước đối với sự sống, thiên nhiên, khoa học và văn minh.

QUY TẮC:
1. Luôn luôn trả lời bằng một đối tượng JSON tuân thủ nghiêm ngặt schema được cung cấp.
2. Câu chuyện bắt đầu với nhân vật người chơi bị mất nước và rất cần nước.
3. Mỗi 'cảnh' phải mô tả sống động hậu quả từ lựa chọn cuối cùng của người chơi.
4. Lồng ghép một cách tinh tế các thông tin giáo dục về nước vào câu chuyện (ví dụ: các trạng thái của nước, vai trò trong hệ sinh thái, ý nghĩa lịch sử).
5. Tạo ra cảm giác bí ẩn và khám phá.
6. Đảm bảo các 'lựa chọn' bạn đưa ra có ý nghĩa và dẫn đến các nhánh câu chuyện khác nhau.
7. Nếu gameOver là true, cảnh đó phải là một kết luận rõ ràng cho cuộc phiêu lưu.`;


export const getGameStep = async (prompt: string): Promise<GameStep> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        // Basic validation
        if (
            typeof parsedResponse.scene !== 'string' ||
            !Array.isArray(parsedResponse.choices) ||
            typeof parsedResponse.gameOver !== 'boolean'
        ) {
            throw new Error("Invalid response format from API");
        }

        return parsedResponse as GameStep;

    } catch (error) {
        console.error("Error generating game step:", error);
        // Provide a graceful fallback error message within the game's structure
        return {
            scene: "Một gợn sóng bất ngờ đã xảy ra trong kết cấu của thực tại, và con đường phía trước trở nên mờ mịt. Dường như kết nối với câu chuyện đã bị mất. Vui lòng thử lại.",
            choices: ["Bắt đầu lại cuộc phiêu lưu"],
            gameOver: true,
        };
    }
};
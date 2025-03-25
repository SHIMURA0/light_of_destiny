import React from 'react';

// 定义组件的 props 类型
interface WelcomeProps {
    onStartAnalysis: () => void;  // 点击"开始分析"按钮时的回调函数
}

const Welcome: React.FC<WelcomeProps> = ({ onStartAnalysis }) => {
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="max-w-4xl px-4 py-12 w-full">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">命运之光</h1>
                    <p className="text-xl text-purple-200">AI玄学命盘分析 · 揭示天赋与潜能</p>
                </header>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold">探索你的命运密码</h2>
                        <p className="mt-3 text-purple-200">基于东方命理与现代心理学的AI深度解析</p>
                    </div>

                    <div className="flex justify-center mb-10">
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>

                    <div className="text-center mb-10">
                        <p className="mb-4">命运之光将为您提供:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <div className="text-xl mb-2">✨</div>
                                <h3 className="font-medium mb-1">人格解析</h3>
                                <p className="text-sm text-purple-200">独特气质与天赋</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <div className="text-xl mb-2">🔮</div>
                                <h3 className="font-medium mb-1">运势预测</h3>
                                <p className="text-sm text-purple-200">事业、情感与财运</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <div className="text-xl mb-2">💫</div>
                                <h3 className="font-medium mb-1">成长指引</h3>
                                <p className="text-sm text-purple-200">潜能激发与平衡建议</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
                            onClick={onStartAnalysis}  // 修改这里，使用传入的回调函数
                        >
                            开始我的命盘分析
                        </button>
                    </div>
                </div>

                <footer className="mt-12 text-center text-sm text-purple-300">
                    <p>命运之光 © 2025 - 探索命理，遇见真我</p>
                </footer>
            </div>
        </div>
    );
};

export default Welcome;
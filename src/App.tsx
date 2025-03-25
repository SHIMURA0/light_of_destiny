import React, { useState } from 'react';
import Welcome from './components/Welcome';
import UserInfoCollector from './components/UserInfoCollector';
import ReportPage from './components/ReportPage';
import './App.css';

function App() {
    // 扩展状态来跟踪当前显示的页面
    // 可能的值: 'welcome', 'form', 'report'
    const [currentPage, setCurrentPage] = useState('welcome');

    // 用户数据状态
    const [userData, setUserData] = useState({
        name: "",
        gender: "",
        birthDate: "",
        birthTime: "",
        birthPlace: "",
        anonymous: false
    });

    // 处理用户数据提交
    const handleFormSubmit = (formData) => {
        setUserData(formData);
        setCurrentPage('report');
    };

    return (
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 min-h-screen text-white w-full">
            {currentPage === 'welcome' && (
                <Welcome onStartAnalysis={() => setCurrentPage('form')} />
            )}

            {currentPage === 'form' && (
                <UserInfoCollector
                    onBack={() => setCurrentPage('welcome')}
                    onComplete={handleFormSubmit}
                />
            )}

            {currentPage === 'report' && (
                <ReportPage
                    userData={userData}
                    onBack={() => setCurrentPage('form')}
                />
            )}
        </div>
    );
}

export default App;
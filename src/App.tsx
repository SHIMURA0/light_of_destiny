// import React, { useState, useEffect, createContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Welcome from './components/Welcome';
// import UserInfoCollector from './components/UserInfoCollector';
// import ReportPage from './components/ReportPage';
// import './App.css';
//
// // 定义用户数据类型
// interface UserData {
//     name: string;
//     gender: string;
//     birthDate: string;
//     birthTime: string;
//     birthPlace: string;
//     anonymous: boolean;
// }
//
// // 定义上下文类型
// interface UserDataContextType {
//     userData: UserData;
//     setUserData: React.Dispatch<React.SetStateAction<UserData>>;
//     clearUserData: () => void;  // 新增清除数据方法
// }
//
// // 创建带有正确类型的上下文
// export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);
//
// // 初始化数据的默认值
// const INITIAL_USER_DATA: UserData = {
//     name: "",
//     gender: "",
//     birthDate: "",
//     birthTime: "",
//     birthPlace: "",
//     anonymous: false
// };
//
// function App() {
//     // 初始化用户数据，优先从localStorage读取
//     const [userData, setUserData] = useState<UserData>(() => {
//         const savedData = localStorage.getItem('userData');
//         if (savedData) {
//             try {
//                 const parsedData = JSON.parse(savedData);
//                 // 确保数据完整性
//                 return {
//                     ...INITIAL_USER_DATA,
//                     ...parsedData
//                 };
//             } catch (e) {
//                 console.error("无法解析保存的用户数据", e);
//                 return INITIAL_USER_DATA;
//             }
//         }
//         return INITIAL_USER_DATA;
//     });
//
//     // 当用户数据变化时，保存到localStorage
//     useEffect(() => {
//         localStorage.setItem('userData', JSON.stringify(userData));
//     }, [userData]);
//
//     // 清除用户数据的方法
//     const clearUserData = () => {
//         setUserData(INITIAL_USER_DATA);
//         localStorage.removeItem('userData');
//         localStorage.removeItem('userReport');  // 同时清除报告缓存
//     };
//
//     // 提供一个自定义钩子来获取Context，使其类型安全
//     const userDataContextValue = React.useMemo(() => ({
//         userData,
//         setUserData,
//         clearUserData  // 新增
//     }), [userData]);
//
//     return (
//         <UserDataContext.Provider value={userDataContextValue}>
//             <BrowserRouter>
//                 <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 min-h-screen text-white w-full">
//                     <Routes>
//                         <Route path="/" element={<Welcome />} />
//                         <Route path="/form" element={<UserInfoCollector />} />
//                         <Route path="/report" element={<ReportPage />} />
//                         <Route path="*" element={<Navigate to="/" replace />} />
//                     </Routes>
//                 </div>
//             </BrowserRouter>
//         </UserDataContext.Provider>
//     );
// }
//
// // 创建自定义钩子，方便在组件中使用Context
// export const useUserData = () => {
//     const context = React.useContext(UserDataContext);
//     if (context === undefined) {
//         throw new Error('useUserData must be used within a UserDataProvider');
//     }
//     return context;
// };
//
// export default App;



// import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserDataProvider } from './contexts/UserDataContext';
import Welcome from './components/Welcome';
import UserInfoCollector from './components/UserInfoCollector';
import ReportPage from './components/ReportPage';
import './App.css';

function App() {
    return (
        <UserDataProvider>
            <BrowserRouter>
                <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 min-h-screen text-white w-full">
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/form" element={<UserInfoCollector />} />
                        <Route path="/report" element={<ReportPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserDataProvider>
    );
}

export default App;
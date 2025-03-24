import React from 'react';
import Welcome from './components/Welcome';
import './App.css';

function App() {
    return (
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 min-h-screen text-white w-full">
            <Welcome />
        </div>
    );
}

export default App;
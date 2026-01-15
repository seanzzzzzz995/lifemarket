import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { create } from 'zustand';
import { Home } from './components/Home';
import { Editor } from './components/Editor';
import { Download } from './components/Download';

// Simple global store for passing the generated image and user data
interface AppState {
  generatedImage: string | null;
  setGeneratedImage: (img: string) => void;
  userInfo: {
    name: string;
    photo: string | null;
  };
  setUserInfo: (info: Partial<AppState['userInfo']>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  generatedImage: null,
  setGeneratedImage: (img) => set({ generatedImage: img }),
  userInfo: {
    name: '',
    photo: null,
  },
  setUserInfo: (info) => set((state) => ({ 
    userInfo: { ...state.userInfo, ...info } 
  })),
}));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:templateId" element={<Editor />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </Router>
  );
};

export default App;
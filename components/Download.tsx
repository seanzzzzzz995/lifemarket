import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../App';
import FileSaver from 'file-saver';
import { Download as DownloadIcon, Share2, Home as HomeIcon } from 'lucide-react';
import { ASSETS } from '../constants';

export const Download: React.FC = () => {
  const navigate = useNavigate();
  const generatedImage = useAppStore((state) => state.generatedImage);

  const handleDownload = () => {
    if (generatedImage) {
      // Handle file-saver UMD/ESM export differences
      // file-saver often exports the function as default, or an object with saveAs
      const saveAs = (FileSaver as any).saveAs || FileSaver;
      saveAs(generatedImage, 'life-supermarket-receipt.png');
    }
  };

  const handleShare = async () => {
    if (generatedImage && navigator.share) {
        // Convert dataURL to Blob for sharing if supported
        try {
            const blob = await (await fetch(generatedImage)).blob();
            const file = new File([blob], 'receipt.png', { type: 'image/png' });
            await navigator.share({
                title: 'Life Supermarket Review',
                text: '這是我今年的結帳清單！',
                files: [file],
            });
        } catch (error) {
            console.error("Sharing failed", error);
            alert("分享功能僅支援部分行動裝置，請嘗試直接下載。");
        }
    } else {
        alert("您的瀏覽器不支援原生分享，請下載後手動分享。");
    }
  };

  if (!generatedImage) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col p-4">
            <p className="mb-4">找不到生成的圖片。</p>
            <button onClick={() => navigate('/')} className="bg-blue-500 text-white px-4 py-2 rounded">回首頁</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center py-8 px-4 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-black text-gray-800 mb-6 tracking-wider">結帳完成！</h2>
      
      <div className="relative w-full shadow-2xl rounded-sm overflow-hidden mb-8 transform transition-transform hover:scale-[1.02]">
        <img src={generatedImage} alt="Final Result" className="w-full h-auto" />
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95"
        >
          <DownloadIcon size={24} />
          <span>儲存圖片 (Save)</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-300 font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-95"
        >
          <Share2 size={24} />
          <span>分享 (Share)</span>
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="w-full text-gray-500 font-medium py-4 flex items-center justify-center space-x-2"
        >
            <HomeIcon size={18} />
            <span>回到入口</span>
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-8 text-center">
        Life Supermarket © 2024
      </p>
    </div>
  );
};
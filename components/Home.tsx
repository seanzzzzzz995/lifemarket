import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../constants';
import { FloatingImage } from './FloatingImage';
import { Upload, X, Check } from 'lucide-react';
import { useAppStore } from '../App';
import { clsx } from 'clsx';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  
  // Local state for the modal inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(userInfo.name || '您的名字');
  const [tempPhoto, setTempPhoto] = useState<string | null>(userInfo.photo);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleComplete = () => {
    setUserInfo({
        name: tempName,
        photo: tempPhoto
    });
    setIsModalOpen(false);
  };

  const openModal = () => {
    setTempName(userInfo.name || '您的名字');
    setTempPhoto(userInfo.photo);
    setIsModalOpen(true);
  };

  const hasUserInfo = !!userInfo.photo;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#333] overflow-hidden flex justify-center items-center">
      <div className="relative w-full h-full max-w-[56.25vh] aspect-[9/16] shadow-2xl overflow-hidden bg-[#E57497]">
        
        {/* === Main Scene === */}
        
        {/* Background Layer */}
        <img
          src={ASSETS.BACKGROUND}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* 1. Cashier (Top Left) */}
        <div className="absolute top-[3%] left-[1%] w-[28%] z-20 pointer-events-none">
             <FloatingImage
                src={ASSETS.CASHIER}
                alt="Cashier Support"
                className="w-full drop-shadow-md"
            />
        </div>

        {/* 2. Thank You (Top Right) */}
        <div className="absolute top-[4%] right-[-6%] w-[80%] z-10 pointer-events-none">
             <FloatingImage
                src={ASSETS.THANK_YOU}
                alt="Thank You"
                className="w-full drop-shadow-md"
                delay
            />
        </div>

        {/* 3. Main Title (Top Center) */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[95%] z-20 pointer-events-none">
             <FloatingImage
                src={ASSETS.TITLE}
                alt="Life Supermarket"
                className="w-full drop-shadow-2xl"
            />
        </div>

        {/* 4. Member Card (Center) - Click to Open Modal */}
        <div 
            className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[90%] z-30 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            onClick={openModal}
        >
            <div className="relative w-full">
                <img 
                    src={ASSETS.MEMBER_CARD} 
                    alt="Member Card" 
                    className="w-full drop-shadow-xl animate-float"
                />
                
                {/* Display Photo (Left Side) */}
                <div className="absolute top-[53%] left-[14%] w-[27%] h-[31%] overflow-hidden rounded-sm animate-float z-40 pointer-events-none">
                    {userInfo.photo ? (
                        <img src={userInfo.photo} alt="User" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200/50" />
                    )}
                </div>

                {/* Display Name (Right Side) */}
                <div 
                    className="absolute top-[60%] left-[48%] w-[40%] text-gray-900 font-bold text-lg md:text-xl animate-float z-40 pointer-events-none truncate"
                    style={{ fontFamily: '"Noto Sans TC", sans-serif' }}
                >
                    {userInfo.name || '您的名字'}
                </div>
                
                {/* Hint Pulse if empty */}
                {!hasUserInfo && (
                    <div className="absolute inset-0 border-4 border-yellow-400 rounded-xl animate-pulse pointer-events-none" />
                )}
            </div>
        </div>

        {/* 5. Sale (Center-Left Overlay) */}
        <div className="absolute top-[65%] left-[23%] w-[38%] z-40 -rotate-12 pointer-events-none">
             <FloatingImage
                src={ASSETS.SALE}
                alt="Sale"
                className="w-full drop-shadow-lg"
            />
        </div>

        {/* 6. Resignation (Bottom Center-Left) */}
        <div className="absolute bottom-[8%] left-[20%] w-[42%] z-10 -rotate-6 pointer-events-none">
             <FloatingImage
                src={ASSETS.RESIGNATION}
                alt="Resignation"
                className="w-full opacity-100 drop-shadow-md"
            />
        </div>

        {/* 7. Receipt (Bottom Left) */}
        <div className="absolute bottom-[3%] left-[-5%] w-[32%] z-20 rotate-12 pointer-events-none">
             <FloatingImage
                src={ASSETS.RECEIPT}
                alt="Receipt"
                className="w-full drop-shadow-md"
                delay
            />
        </div>

        {/* 8. Hot Items (Bottom Right) */}
        <div className="absolute bottom-[11%] right-[2%] w-[42%] z-20 rotate-3 pointer-events-none">
             <FloatingImage
                src={ASSETS.HOT_ITEMS}
                alt="Hot Items"
                className="w-full drop-shadow-md"
                delay
            />
        </div>

        {/* 9. Action Button (Bottom Right) */}
        <div className="absolute bottom-[2%] right-[5%] w-[38%] z-50">
             <button 
                onClick={() => {
                    if (!hasUserInfo) {
                        openModal();
                    } else {
                        navigate('/edit/member-card');
                    }
                }}
                className={clsx(
                    "w-full relative group transition-transform active:scale-95 cursor-pointer",
                    !hasUserInfo ? "grayscale opacity-70" : ""
                )}
            >
                <img src={ASSETS.BUTTON} alt="Start Checkout" className="w-full drop-shadow-2xl animate-pulse" />
            </button>
        </div>

        {/* === MODAL === */}
        {isModalOpen && (
            <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
                <div className="w-full max-w-sm relative">
                    {/* Close Button */}
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="absolute -top-12 right-0 p-2 text-white bg-white/20 rounded-full hover:bg-white/30"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-white text-3xl font-black text-center mb-8 drop-shadow-lg tracking-widest text-outline">
                        請出示會員卡
                    </h2>
                    
                    {/* Card Container */}
                    <div className="relative w-full mb-8">
                        <img src={ASSETS.MEMBER_CARD} alt="Card" className="w-full shadow-2xl rounded-lg" />
                        
                        {/* Upload Zone */}
                        <div className="absolute top-[53%] left-[14%] w-[27%] h-[31%] group">
                            <label className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors cursor-pointer rounded-sm border-2 border-dashed border-white/50 flex flex-col items-center justify-center text-white overflow-hidden">
                                {tempPhoto ? (
                                    <img src={tempPhoto} className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload size={20} className="mb-1" />
                                        <span className="text-[10px] font-bold">點擊上傳</span>
                                    </>
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                            </label>
                        </div>

                        {/* Text Input */}
                        <input 
                            type="text"
                            value={tempName === '您的名字' ? '' : tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder="輸入您的姓名"
                            className="absolute top-[60%] left-[48%] w-[40%] bg-transparent border-b-2 border-gray-400 focus:border-blue-600 text-gray-900 font-bold text-xl outline-none placeholder-gray-400"
                            style={{ fontFamily: '"Noto Sans TC", sans-serif' }}
                        />
                    </div>

                    {/* Complete Button */}
                    <button
                        onClick={handleComplete}
                        className="w-full bg-[#FFE100] text-black font-black text-2xl py-4 rounded-xl shadow-[0_4px_0_rgb(200,160,0)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center space-x-2 border-2 border-black"
                    >
                        <span>完 成</span>
                        <Check size={28} strokeWidth={3} />
                    </button>
                    
                    <p className="text-white/60 text-center mt-4 text-sm font-bold">
                        填寫完成後即可開始結帳
                    </p>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
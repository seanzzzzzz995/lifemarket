import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import { TEMPLATES } from '../constants';
import { Upload, Type, ArrowLeft, Check } from 'lucide-react';
import { useAppStore } from '../App';

const URLImage = ({ src, ...props }: any) => {
  const [image] = useImage(src, 'anonymous');
  return <KonvaImage image={image} {...props} />;
};

export const Editor: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const setGeneratedImage = useAppStore((state) => state.setGeneratedImage);
  const { userInfo, setUserInfo } = useAppStore();

  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  
  // State
  const [photoUrl, setPhotoUrl] = useState<string | null>(userInfo.photo);
  const [photoImage] = useImage(photoUrl || '', 'anonymous');
  const [text, setText] = useState(userInfo.name || template.textArea.defaultText);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [photoProps, setPhotoProps] = useState({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0
  });

  // Refs
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const photoNodeRef = useRef<Konva.Image>(null);

  // Resize handling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Maintain 9:16 aspect ratio or fit screen
        const height = width * (16/9); 
        // If height exceeds container, scale down
        if (height > window.innerHeight * 0.8) {
             const h = window.innerHeight * 0.8;
             setStageSize({ width: h * (9/16), height: h });
        } else {
             setStageSize({ width, height });
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize photo position when image loads or stage resizes
  useEffect(() => {
    if (photoImage && stageSize.width > 0) {
      // Fit the photo area
      const targetW = (template.photoArea.width / 100) * stageSize.width;
      const targetH = (template.photoArea.height / 100) * stageSize.height;
      
      // Calculate scale to cover the area
      const scale = Math.max(
        targetW / photoImage.width,
        targetH / photoImage.height
      );

      setPhotoProps({
        x: (template.photoArea.x / 100) * stageSize.width, // Start at area origin
        y: (template.photoArea.y / 100) * stageSize.height,
        scaleX: scale,
        scaleY: scale,
        rotation: 0
      });
    }
  }, [photoImage, stageSize, template]);

  // Sync back to store when editing here
  useEffect(() => {
    setUserInfo({ name: text, photo: photoUrl });
  }, [text, photoUrl, setUserInfo]);


  // Touch/Gesture Logic for Pinch Zoom
  const lastCenter = useRef<{ x: number; y: number } | null>(null);
  const lastDist = useRef<number>(0);

  const getDistance = (p1: Touch, p2: Touch) => {
    return Math.sqrt(Math.pow(p2.clientX - p1.clientX, 2) + Math.pow(p2.clientY - p1.clientY, 2));
  };

  const getCenter = (p1: Touch, p2: Touch) => {
    return {
      x: (p1.clientX + p2.clientX) / 2,
      y: (p1.clientY + p2.clientY) / 2,
    };
  };

  const handleTouchMove = (e: any) => {
    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    if (touch1 && touch2) {
      // Pinch logic
      if (photoNodeRef.current) {
        e.evt.preventDefault();
        
        const dist = getDistance(touch1, touch2);
        const center = getCenter(touch1, touch2);

        if (!lastDist.current) {
          lastDist.current = dist;
        }
        if (!lastCenter.current) {
          lastCenter.current = center;
        }

        // Simple scaling for now
        const scale = photoNodeRef.current.scaleX() * (dist / lastDist.current);

        setPhotoProps(prev => ({
          ...prev,
          scaleX: scale,
          scaleY: scale,
        }));

        lastDist.current = dist;
        lastCenter.current = center;
      }
    }
  };

  const handleTouchEnd = () => {
    lastDist.current = 0;
    lastCenter.current = null;
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
            setPhotoUrl(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleExport = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      setGeneratedImage(uri);
      navigate('/download');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full max-w-md bg-gray-800 p-4 flex justify-between items-center text-white z-10">
        <button onClick={() => navigate('/')} className="p-2"><ArrowLeft /></button>
        <span className="font-bold text-lg">確認您的結帳明細</span>
        <button onClick={handleExport} className="p-2 bg-green-500 rounded-full text-white font-bold animate-bounce"><Check /></button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 w-full max-w-md flex items-center justify-center bg-gray-800 overflow-hidden relative" ref={containerRef}>
        {stageSize.width > 0 && (
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            ref={stageRef}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="bg-transparent shadow-2xl"
          >
            <Layer>
                {/* 1. User Photo (Bottom) */}
                {photoUrl && (
                    <URLImage
                        image={photoImage}
                        {...photoProps}
                        draggable
                        onDragEnd={(e: any) => {
                            setPhotoProps({
                                ...photoProps,
                                x: e.target.x(),
                                y: e.target.y(),
                            });
                        }}
                        ref={photoNodeRef}
                    />
                )}
                
                {/* 2. Template Overlay (Top) */}
                <URLImage
                    src={template.imageUrl}
                    width={stageSize.width}
                    height={stageSize.height}
                    listening={false} // Allow clicks to pass through to photo
                />

                {/* 3. Text Overlay */}
                <KonvaText
                    text={text}
                    x={(template.textArea.x / 100) * stageSize.width}
                    y={(template.textArea.y / 100) * stageSize.height}
                    width={(template.textArea.width / 100) * stageSize.width}
                    fontSize={template.textArea.fontSize * (stageSize.width / 400)}
                    fontFamily="Noto Sans TC"
                    fontStyle="bold"
                    align={template.textArea.align}
                    fill={template.textArea.color}
                />
            </Layer>
          </Stage>
        )}
      </div>

      {/* Editor Controls */}
      <div className="w-full max-w-md bg-white p-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-20 space-y-4">
        
        {/* Upload Button */}
        <div className="flex items-center space-x-4">
            <div className="relative flex-1">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-100 text-blue-600 py-3 rounded-xl font-bold border border-blue-200">
                    <Upload size={20} />
                    <span>更換照片</span>
                </button>
            </div>
        </div>

        {/* Text Edit */}
        <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-600 font-bold">
                <Type size={18} />
                <span>編輯文字</span>
            </label>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="輸入文字..."
            />
        </div>

        <p className="text-xs text-center text-gray-400 mt-2">
            最後確認：您可以拖曳調整照片位置
        </p>
      </div>
    </div>
  );
};
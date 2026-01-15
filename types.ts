export interface TemplateConfig {
  id: string;
  name: string;
  imageUrl: string;
  // Percentage based coordinates (0-100) for responsive layout
  photoArea: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
  };
  textArea: {
    x: number;
    y: number;
    width: number;
    height: number;
    fontSize: number;
    color: string;
    align: 'left' | 'center' | 'right';
    defaultText: string;
  };
}

export interface AssetItem {
  name: string;
  url: string;
}

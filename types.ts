export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export enum ToolType {
  COPY_WRITER = 'COPY_WRITER',
  IMAGE_GENERATOR = 'IMAGE_GENERATOR'
}

export interface GeneratedContent {
  type: ToolType;
  content: string; // Text content or Image URL (base64)
  timestamp: number;
}

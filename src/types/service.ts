
import { ReactNode } from 'react';

export interface ServiceFeature {
  name: string;
  description: string;
  icon: ReactNode;
}

export interface ServiceScreenshot {
  imageUrl: string;
  caption?: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: ReactNode;
  bannerImageUrl?: string;
  features?: ServiceFeature[];
  screenshots?: ServiceScreenshot[];
  useCases?: ServiceUseCase[];
  demoUrl?: string;
}

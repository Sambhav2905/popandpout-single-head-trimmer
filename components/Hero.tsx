import React, { useState, useEffect } from 'react';
import { Star, Check, Truck, Clock, Package, Users, ShoppingCart, ShieldCheck, Flame, Zap, Gift } from 'lucide-react';

const PRODUCT_IMAGES = [
  '/images/hero1.png',
  '/images/model-holding.png',
  '/images/model-mirror.png',
  '/images/product4.png',
  '/images/product5.png',
  '/images/product6.png'
];

interface Props {
  onOrderClick: () => void;
  packType: 'single' | 'duo';
  setPackType: (type: 'single' | 'duo') => void;
}

const Hero: React.FC<Props> = ({ onOrderClick, packType, setPackType }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15795); 
  const [viewers, setViewers] = useState(Math.floor(Math.random() * (120 - 40 + 1)) + 40);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const viewerInterval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const newVal = prev + delta;
        return newVal < 30 ? 30 : newVal > 150 ? 150 : newVal;

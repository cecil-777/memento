import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileLayout } from '@/components/layout/MobileLayout';
export default function LayoutWrapper() {
  const location = useLocation();
  
  return (
    <MobileLayout>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </MobileLayout>
  );
}
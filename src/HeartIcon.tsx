import { motion } from 'framer-motion';

export default function HeartIcon({ isSpeaking }: { isSpeaking: boolean }) {
  return (
    <div style={{ position: 'relative' }}>
      <motion.svg
        width="160"
        height="160"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        animate={isSpeaking ? {
          scale: [1, 1.08, 1],
          rotate: [0, -3, 3, 0],
          filter: ['drop-shadow(0 0 4px #ff9acb)', 'drop-shadow(0 0 12px #ffc2dd)', 'drop-shadow(0 0 4px #ff9acb)']
        } : { scale: 1, rotate: 0, filter: 'none' }}
        transition={{ duration: 1.2, repeat: isSpeaking ? Infinity : 0 }}
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff758c" />
            <stop offset="100%" stopColor="#ff7eb3" />
          </linearGradient>
        </defs>
        <path
          d="M256 464s-181-116-181-272c0-66 54-120 120-120 37 0 70 17 91 44 21-27 54-44 91-44 66 0 120 54 120 120 0 156-181 272-181 272z"
          fill="url(#heartGradient)"
        />
      </motion.svg>
      
      {isSpeaking && (
        <>
          <motion.div
            animate={{ y: [-10, -60], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '30%',
              transform: 'translateX(-50%)',
              color: '#fff4f7',
              fontSize: '2rem'
            }}
          >
            💖
          </motion.div>
          
          <motion.div
            animate={{ y: [-10, -60], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 2.1, ease: 'easeOut', delay: 0.3 }}
            style={{
              position: 'absolute',
              left: '30%',
              top: '25%',
              transform: 'translateX(-50%)',
              color: '#fff4f7',
              fontSize: '1.5rem'
            }}
          >
            ✨
          </motion.div>
          
          <motion.div
            animate={{ y: [-10, -60], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut', delay: 0.6 }}
            style={{
              position: 'absolute',
              left: '70%',
              top: '35%',
              transform: 'translateX(-50%)',
              color: '#fff4f7',
              fontSize: '1.8rem'
            }}
          >
            💫
          </motion.div>
        </>
      )}
    </div>
  );
}
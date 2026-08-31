import React from 'react';

interface VoiceWaveformIconProps {
  className?: string;
  barClassName?: string;
  barCount?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const VoiceWaveformIcon: React.FC<VoiceWaveformIconProps> = ({
  className = '',
  barClassName = '',
  barCount = 4,
  size = 'sm',
  animated = true,
}) => {
  // Height and gap configs based on size
  const sizeStyles = {
    xs: { containerH: 'h-3.5', width: 'w-[2px]', maxH: 14, gap: 'gap-[2px]' },
    sm: { containerH: 'h-4', width: 'w-[2.5px]', maxH: 16, gap: 'gap-[2.5px]' },
    md: { containerH: 'h-5', width: 'w-[3px]', maxH: 20, gap: 'gap-[3px]' },
    lg: { containerH: 'h-6', width: 'w-[3.5px]', maxH: 24, gap: 'gap-1' },
  }[size];

  const barDelays = ['0s', '0.2s', '0.4s', '0.15s', '0.35s'];
  const barDurations = ['0.7s', '0.9s', '0.65s', '0.85s', '0.75s'];

  return (
    <div
      className={`inline-flex items-center justify-center ${sizeStyles.containerH} ${sizeStyles.gap} select-none ${className}`}
      aria-label="Запись голоса"
    >
      {Array.from({ length: barCount }).map((_, index) => {
        const delay = barDelays[index % barDelays.length];
        const duration = barDurations[index % barDurations.length];

        return (
          <span
            key={index}
            style={
              animated
                ? {
                    animation: `voiceWaveformAnim ${duration} ease-in-out infinite alternate`,
                    animationDelay: delay,
                  }
                : { height: '50%' }
            }
            className={`rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)] ${sizeStyles.width} transition-all ${barClassName}`}
          />
        );
      })}
    </div>
  );
};

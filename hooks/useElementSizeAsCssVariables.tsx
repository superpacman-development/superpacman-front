import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

interface UseFixedElementCssVariablesOptions {
  widthVariableName?: string;
  heightVariableName?: string;
}

export const useElementSizeAsCssVariables = <T extends HTMLElement>({
  widthVariableName,
  heightVariableName,
}: UseFixedElementCssVariablesOptions) => {
  if (widthVariableName && !widthVariableName.startsWith('--')) {
    throw new Error('widthVariableName must start with "--"');
  }

  if (heightVariableName && !heightVariableName.startsWith('--')) {
    throw new Error('heightVariableName must start with "--"');
  }

  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const $ref = ref.current;
    if (!$ref) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize: width, blockSize: height } = entry.borderBoxSize.at(0) ?? {};

        if (widthVariableName && width !== undefined) {
          window.document.documentElement.style.setProperty(widthVariableName, `${width}px`);
        }

        if (heightVariableName && height !== undefined) {
          window.document.documentElement.style.setProperty(heightVariableName, `${height}px`);
        }
      }
    });

    observer.observe($ref);

    return () => {
      observer.disconnect();

      if (widthVariableName) {
        window.document.documentElement.style.setProperty(widthVariableName, '');
      }

      if (heightVariableName) {
        window.document.documentElement.style.setProperty(heightVariableName, '');
      }
    };
  }, [heightVariableName, widthVariableName]);

  return ref;
};

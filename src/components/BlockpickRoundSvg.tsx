"use client";

import React, { useState, useCallback, useRef } from "react";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { ParentSize } from "@visx/responsive";
import { TransformMatrix } from "@visx/zoom/lib/types";
import { throttle } from "lodash";

interface Block {
  id: number;
  x: number;
  y: number;
  overlay?: string; // Optional image overlay URL
}

interface BlockpickRoundProps {
  blocks: Block[];
  onBlockClick: (block: Block) => void;
}

const BlockpickRoundSvg: React.FC<BlockpickRoundProps> = ({
  blocks,
  onBlockClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const gap = 5;
  const blockSize = 20;

  const handleZoom = useCallback(
    throttle((event, zoom) => {
      const point = localPoint(event) || { x: 0, y: 0 };
      zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
    }, 100),
    []
  );

  const handleDragMove = useCallback(
    throttle((event, zoom) => {
      zoom.dragMove(event);
    }, 100),
    []
  );

  return (
    <ParentSize>
      {({ width, height }) => (
        <div className="relative border overflow-hidden" ref={containerRef}>
          {width > 0 && height > 0 && (
            <Zoom<SVGSVGElement>
              width={width}
              height={height}
              scaleXMin={1 / 2}
              scaleXMax={4}
              scaleYMin={1 / 2}
              scaleYMax={4}
              initialTransformMatrix={{
                scaleX: 1,
                scaleY: 1,
                translateX: 0,
                translateY: 0,
                skewX: 0,
                skewY: 0,
              }}
            >
              {(zoom) => (
                <svg
                  width={width}
                  height={height}
                  style={{
                    cursor: zoom.isDragging ? "grabbing" : "grab",
                    touchAction: "none",
                  }}
                  ref={zoom.containerRef}
                  onClick={(event) => {
                    const point = localPoint(event) || { x: 0, y: 0 };
                    const x =
                      (point.x - zoom.transformMatrix.translateX) /
                      zoom.transformMatrix.scaleX;
                    const y =
                      (point.y - zoom.transformMatrix.translateY) /
                      zoom.transformMatrix.scaleY;
                    const block = blocks.find(
                      (block) =>
                        x >= block.x &&
                        x <= block.x + blockSize &&
                        y >= block.y &&
                        y <= block.y + blockSize
                    );
                    if (block) {
                      setSelectedBlock(block);
                      onBlockClick(block);
                    }
                  }}
                >
                  <g transform={zoom.toString()}>
                    {blocks.map(({ id, x, y, overlay }) => (
                      <g key={id}>
                        <rect
                          x={x + gap / 2}
                          y={y + gap / 2}
                          width={blockSize - gap}
                          height={blockSize - gap}
                          fill="pink"
                          stroke={selectedBlock?.id === id ? "red" : "none"}
                          strokeWidth={2}
                        />
                        {overlay && (
                          <image
                            href={overlay}
                            x={x + gap / 2}
                            y={y + gap / 2}
                            width={blockSize - gap}
                            height={blockSize - gap}
                          />
                        )}
                      </g>
                    ))}
                  </g>
                  <rect
                    width={width}
                    height={height}
                    fill="transparent"
                    onTouchStart={zoom.dragStart}
                    onTouchMove={(event) => handleDragMove(event, zoom)}
                    onTouchEnd={zoom.dragEnd}
                    onMouseDown={zoom.dragStart}
                    onMouseMove={(event) => handleDragMove(event, zoom)}
                    onMouseUp={zoom.dragEnd}
                    onMouseLeave={() => {
                      if (zoom.isDragging) zoom.dragEnd();
                    }}
                    onDoubleClick={(event) => handleZoom(event, zoom)}
                  />
                </svg>
              )}
            </Zoom>
          )}
        </div>
      )}
    </ParentSize>
  );
};

export default BlockpickRoundSvg;

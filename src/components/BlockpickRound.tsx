"use client";

import React, { useEffect, useRef } from "react";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { TransformMatrix } from "@visx/zoom/lib/types";

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

const BlockpickRound: React.FC<BlockpickRoundProps> = ({
  blocks,
  onBlockClick,
}) => {
  const width = 800;
  const height = 600;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gap = 5;
  const blockSize = 20;
  const adjustedBlockSize = blockSize - gap;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.clearRect(0, 0, width, height);
      blocks.forEach(({ id, x, y, overlay }) => {
        const adjustedX = x + gap / 2;
        const adjustedY = y + gap / 2;

        // Draw shadow
        context.fillStyle = "rgba(0, 0, 0, 0.2)";
        context.fillRect(
          adjustedX + 2,
          adjustedY + 2,
          adjustedBlockSize,
          adjustedBlockSize
        );

        // Draw block
        context.fillStyle = "pink";
        context.beginPath();
        context.moveTo(adjustedX + 4, adjustedY);
        context.lineTo(adjustedX + adjustedBlockSize - 4, adjustedY);
        context.quadraticCurveTo(
          adjustedX + adjustedBlockSize,
          adjustedY,
          adjustedX + adjustedBlockSize,
          adjustedY + 4
        );
        context.lineTo(
          adjustedX + adjustedBlockSize,
          adjustedY + adjustedBlockSize - 4
        );
        context.quadraticCurveTo(
          adjustedX + adjustedBlockSize,
          adjustedY + adjustedBlockSize,
          adjustedX + adjustedBlockSize - 4,
          adjustedY + adjustedBlockSize
        );
        context.lineTo(adjustedX + 4, adjustedY + adjustedBlockSize);
        context.quadraticCurveTo(
          adjustedX,
          adjustedY + adjustedBlockSize,
          adjustedX,
          adjustedY + adjustedBlockSize - 4
        );
        context.lineTo(adjustedX, adjustedY + 4);
        context.quadraticCurveTo(
          adjustedX,
          adjustedY,
          adjustedX + 4,
          adjustedY
        );
        context.closePath();
        context.fill();

        if (overlay) {
          const img = new Image();
          img.src = overlay;
          img.onload = () => {
            context.drawImage(
              img,
              adjustedX,
              adjustedY,
              adjustedBlockSize,
              adjustedBlockSize
            );
          };
        }
      });
    }
  }, [blocks]);

  return (
    <div className="relative">
      <Zoom<HTMLElement>
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
          <div
            className="relative"
            style={{
              width,
              height,
              cursor: zoom.isDragging ? "grabbing" : "grab",
              touchAction: "none",
              position: "relative",
              overflow: "hidden",
            }}
            ref={zoom.containerRef as React.RefObject<HTMLDivElement>}
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
                onBlockClick(block);
              }
            }}
          >
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              style={{
                transform: zoom.toString(),
                transformOrigin: "0 0",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              onDoubleClick={(event) => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            />
          </div>
        )}
      </Zoom>
    </div>
  );
};

export default BlockpickRound;

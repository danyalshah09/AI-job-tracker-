"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface NetworkNode {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  isDragging: boolean
  id: number
}

const SpiderWebBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<NetworkNode[]>([])
  const dragStateRef = useRef<{
    isDragging: boolean
    dragNodeId: number | null
    mouseX: number
    mouseY: number
  }>({
    isDragging: false,
    dragNodeId: null,
    mouseX: 0,
    mouseY: 0
  })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Initialize network nodes with more organic distribution
    const nodeCount = Math.floor((dimensions.width * dimensions.height) / 20000)
    nodesRef.current = []

    for (let i = 0; i < nodeCount; i++) {
      nodesRef.current.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1.5,
        isDragging: false,
        id: i
      })
    }

    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }

    const handleMouseDown = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // Find the closest node to mouse
      let closestNode: NetworkNode | null = null
      let closestDistance = Infinity

      nodesRef.current.forEach((node) => {
        const distance = getDistance(mouseX, mouseY, node.x, node.y)
        if (distance < 20 && distance < closestDistance) {
          closestNode = node
          closestDistance = distance
        }
      })

      if (closestNode) {
        dragStateRef.current = {
          isDragging: true,
          dragNodeId: closestNode.id,
          mouseX,
          mouseY
        }
        closestNode.isDragging = true
        canvas.style.cursor = 'grabbing'
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      if (dragStateRef.current.isDragging && dragStateRef.current.dragNodeId !== null) {
        const dragNode = nodesRef.current.find(n => n.id === dragStateRef.current.dragNodeId)
        if (dragNode) {
          dragNode.x = mouseX
          dragNode.y = mouseY
          dragNode.vx = 0
          dragNode.vy = 0
        }
      } else {
        // Check if mouse is over a node for cursor change
        let isOverNode = false
        nodesRef.current.forEach((node) => {
          const distance = getDistance(mouseX, mouseY, node.x, node.y)
          if (distance < 20) {
            isOverNode = true
          }
        })
        canvas.style.cursor = isOverNode ? 'grab' : 'default'
      }

      dragStateRef.current.mouseX = mouseX
      dragStateRef.current.mouseY = mouseY
    }

    const handleMouseUp = () => {
      if (dragStateRef.current.dragNodeId !== null) {
        const dragNode = nodesRef.current.find(n => n.id === dragStateRef.current.dragNodeId)
        if (dragNode) {
          dragNode.isDragging = false
        }
      }
      dragStateRef.current = {
        isDragging: false,
        dragNodeId: null,
        mouseX: 0,
        mouseY: 0
      }
      canvas.style.cursor = 'default'
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update node positions (only if not being dragged)
      nodesRef.current.forEach((node) => {
        if (!node.isDragging) {
          // Update position
          node.x += node.vx
          node.y += node.vy

          // Bounce off edges
          if (node.x < 0 || node.x > dimensions.width) {
            node.vx *= -1
          }
          if (node.y < 0 || node.y > dimensions.height) {
            node.vy *= -1
          }

          // Keep nodes in bounds
          node.x = Math.max(0, Math.min(dimensions.width, node.x))
          node.y = Math.max(0, Math.min(dimensions.height, node.y))

          // Apply slight friction
          node.vx *= 0.999
          node.vy *= 0.999

          // Add small random forces
          if (Math.random() < 0.005) {
            node.vx += (Math.random() - 0.5) * 0.1
            node.vy += (Math.random() - 0.5) * 0.1
          }

          // Limit maximum speed
          const maxSpeed = 1
          const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
          if (currentSpeed > maxSpeed) {
            node.vx = (node.vx / currentSpeed) * maxSpeed
            node.vy = (node.vy / currentSpeed) * maxSpeed
          }
        }
      })

      // Draw connections first (background)
      nodesRef.current.forEach((node, i) => {
        nodesRef.current.slice(i + 1).forEach((otherNode) => {
          const distance = getDistance(node.x, node.y, otherNode.x, otherNode.y)

          if (distance < 150) {
            const opacity = Math.max(0, (150 - distance) / 150)
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Draw nodes (foreground)
      nodesRef.current.forEach((node) => {
        // Highlight dragged node
        if (node.isDragging) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
          ctx.fill()
        }

        // Main node (tiny)
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.isDragging ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.8)'
        ctx.fill()
      })

      // Draw connection to mouse if dragging
      if (dragStateRef.current.isDragging && dragStateRef.current.dragNodeId !== null) {
        const dragNode = nodesRef.current.find(n => n.id === dragStateRef.current.dragNodeId)
        if (dragNode) {
          nodesRef.current.forEach((otherNode) => {
            if (otherNode.id !== dragNode.id) {
              const distance = getDistance(dragNode.x, dragNode.y, otherNode.x, otherNode.y)
              if (distance < 200) {
                const opacity = Math.max(0, (200 - distance) / 200)
                ctx.beginPath()
                ctx.moveTo(dragNode.x, dragNode.y)
                ctx.lineTo(otherNode.x, otherNode.y)
                ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.4})`
                ctx.lineWidth = 2
                ctx.stroke()
              }
            }
          })
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        zIndex: 1,
        background: 'transparent'
      }}
    />
  )
}

export default SpiderWebBackground
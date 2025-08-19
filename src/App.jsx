import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Check, X, Edit3 } from 'lucide-react'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState('all')

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('neo-brutalism-todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('neo-brutalism-todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([todo, ...todos])
      setNewTodo('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-black text-black mb-4 transform -rotate-2 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            TODO
          </h1>
          <p className="text-xl font-bold text-black bg-white px-6 py-2 inline-block transform rotate-1 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            NEO BRUTALISM STYLE
          </p>
        </motion.div>

        {/* Add Todo Form */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="bg-white border-4 border-black p-6 transform -rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="flex gap-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 text-lg font-bold border-4 border-black focus:outline-none focus:border-pink-500 transform rotate-1"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTodo}
                className="px-6 py-3 bg-green-400 border-4 border-black font-black text-black hover:bg-green-300 transform rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              >
                <Plus size={24} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="mb-6 flex justify-center gap-4"
        >
          {['all', 'active', 'completed'].map((filterType) => (
            <motion.button
              key={filterType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-2 font-black text-black border-4 border-black transform ${
                filter === filterType
                  ? 'bg-yellow-400 rotate-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]'
                  : 'bg-white -rotate-1 hover:bg-gray-100 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {filterType.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 text-center"
        >
          <div className="bg-black text-white px-6 py-3 inline-block transform rotate-1 border-4 border-black shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            <span className="font-black text-lg">
              {activeCount} ACTIVE • {completedCount} COMPLETED • {todos.length} TOTAL
            </span>
          </div>
        </motion.div>

        {/* Todo List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTodos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white border-4 border-black p-4 transform ${
                  index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                } shadow-[6px_6px_0px_rgba(0,0,0,1)] ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {editingId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className="flex-1 px-3 py-2 text-lg font-bold border-2 border-black focus:outline-none focus:border-blue-500"
                        autoFocus
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={saveEdit}
                        className="p-2 bg-green-400 border-2 border-black hover:bg-green-300"
                      >
                        <Check size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={cancelEdit}
                        className="p-2 bg-red-400 border-2 border-black hover:bg-red-300"
                      >
                        <X size={20} />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-8 h-8 border-4 border-black flex items-center justify-center font-black ${
                          todo.completed
                            ? 'bg-green-400 text-black'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                      >
                        {todo.completed && <Check size={16} />}
                      </motion.button>
                      
                      <span
                        className={`flex-1 text-lg font-bold ${
                          todo.completed
                            ? 'line-through text-gray-600'
                            : 'text-black'
                        }`}
                      >
                        {todo.text}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEdit(todo)}
                        className="p-2 bg-blue-400 border-2 border-black hover:bg-blue-300"
                      >
                        <Edit3 size={16} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 bg-red-400 border-2 border-black hover:bg-red-300"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTodos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white border-4 border-black p-8 transform rotate-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] inline-block">
              <p className="text-2xl font-black text-black">
                {filter === 'active' && 'NO ACTIVE TASKS!'}
                {filter === 'completed' && 'NO COMPLETED TASKS!'}
                {filter === 'all' && 'NO TASKS YET!'}
              </p>
              <p className="text-lg font-bold text-gray-600 mt-2">
                {filter === 'all' ? 'ADD YOUR FIRST TASK ABOVE' : 'TRY A DIFFERENT FILTER'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 mb-8"
        >
          <p className="text-black font-bold bg-white px-4 py-2 inline-block border-4 border-black transform -rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            STAY PRODUCTIVE! 💪
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default App
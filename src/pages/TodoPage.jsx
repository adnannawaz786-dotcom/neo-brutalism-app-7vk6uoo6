import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, X, Edit3 } from 'lucide-react';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('neo-brutalism-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('neo-brutalism-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black text-black mb-4 transform -rotate-2">
            NEO TODO
          </h1>
          <div className="bg-black text-white px-6 py-3 transform rotate-1 inline-block border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold text-lg">
              {completedCount} / {totalCount} COMPLETED
            </p>
          </div>
        </motion.div>

        {/* Add Todo Input */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, addTodo)}
                placeholder="ADD A NEW TASK..."
                className="flex-1 p-3 text-lg font-bold border-2 border-black bg-yellow-200 focus:bg-yellow-100 outline-none transform rotate-1"
                style={{ fontFamily: 'monospace' }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={addTodo}
                className="bg-green-400 border-2 border-black p-3 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <Plus size={24} className="text-black" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Todo List */}
        <div className="space-y-4">
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ x: -100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 100, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 transform ${
                  index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                } ${todo.completed ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center gap-3">
                  {/* Complete Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleComplete(todo.id)}
                    className={`w-8 h-8 border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${
                      todo.completed 
                        ? 'bg-green-400 hover:bg-green-300' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {todo.completed && <Check size={16} className="text-black" />}
                  </motion.button>

                  {/* Todo Text */}
                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                        className="w-full p-2 text-lg font-bold border-2 border-black bg-yellow-200 outline-none"
                        style={{ fontFamily: 'monospace' }}
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-lg font-bold block ${
                          todo.completed 
                            ? 'line-through text-gray-600' 
                            : 'text-black'
                        }`}
                        style={{ fontFamily: 'monospace' }}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {editingId === todo.id ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={saveEdit}
                          className="bg-green-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                        >
                          <Check size={16} className="text-black" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={cancelEdit}
                          className="bg-red-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                        >
                          <X size={16} className="text-black" />
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="bg-blue-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                        >
                          <Edit3 size={16} className="text-black" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteTodo(todo.id)}
                          className="bg-red-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                        >
                          <Trash2 size={16} className="text-black" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-2">
              <h2 className="text-2xl font-black text-black mb-4" style={{ fontFamily: 'monospace' }}>
                NO TASKS YET!
              </h2>
              <p className="text-lg font-bold text-gray-700" style={{ fontFamily: 'monospace' }}>
                ADD YOUR FIRST TASK ABOVE
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit3, Check, X } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');

  const handleEditStart = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
    }
    setEditingId(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleEditSave(id);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
          <h3 className="text-2xl font-black text-gray-800 mb-2 transform -rotate-1">
            NO TASKS YET!
          </h3>
          <p className="text-gray-600 font-bold">
            Add your first task above to get started
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -50, rotate: -2 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              rotate: index % 2 === 0 ? 1 : -1,
              transition: { delay: index * 0.1 }
            }}
            exit={{ 
              opacity: 0, 
              x: 100, 
              rotate: 10,
              transition: { duration: 0.3 }
            }}
            whileHover={{ 
              scale: 1.02, 
              rotate: 0,
              transition: { duration: 0.2 }
            }}
            className={`
              bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              p-4 transform transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              ${task.completed ? 'bg-gray-100' : 'bg-white'}
            `}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onToggle(task.id)}
                className={`
                  w-6 h-6 border-3 border-black flex items-center justify-center
                  transition-all duration-200 font-black text-sm
                  ${task.completed 
                    ? 'bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white hover:bg-yellow-100'
                  }
                `}
              >
                {task.completed && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-black"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>

              {/* Task Text */}
              <div className="flex-1">
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, task.id)}
                    onBlur={() => handleEditSave(task.id)}
                    className="w-full bg-white border-2 border-black px-3 py-2 font-bold text-gray-800 focus:outline-none focus:ring-0 focus:border-blue-500"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`
                      font-bold text-lg cursor-pointer
                      ${task.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-800'
                      }
                    `}
                    onClick={() => handleEditStart(task)}
                  >
                    {task.text}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {editingId === task.id ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditSave(task.id)}
                      className="bg-green-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    >
                      <Check size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEditCancel}
                      className="bg-red-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    >
                      <X size={16} />
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditStart(task)}
                      className="bg-blue-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    >
                      <Edit3 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(task.id)}
                      className="bg-red-400 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Task metadata */}
            <div className="mt-3 flex justify-between items-center text-xs font-bold text-gray-600">
              <span>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
              {task.completed && (
                <span className="bg-yellow-300 border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  COMPLETED!
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
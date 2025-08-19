import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const TaskForm = ({ onAddTask, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="bg-white rounded-none border-4 border-black shadow-[8px_8px_0px_0px_#000] w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-yellow-400 border-b-4 border-black p-4 flex items-center justify-between">
          <h2 className="text-xl font-black text-black uppercase tracking-tight">
            Add New Task
          </h2>
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] transition-all duration-200 hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-black text-black uppercase tracking-wide mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full p-3 border-4 border-black bg-white text-black placeholder-gray-500 font-bold focus:outline-none focus:bg-yellow-100 transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black uppercase tracking-wide mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
              rows={3}
              className="w-full p-3 border-4 border-black bg-white text-black placeholder-gray-500 font-bold focus:outline-none focus:bg-yellow-100 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-black text-black uppercase tracking-wide mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 border-4 border-black bg-white text-black font-bold focus:outline-none focus:bg-yellow-100 transition-colors duration-200"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-black uppercase tracking-wide mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border-4 border-black bg-white text-black font-bold focus:outline-none focus:bg-yellow-100 transition-colors duration-200"
              >
                <option value="personal">👤 Personal</option>
                <option value="work">💼 Work</option>
                <option value="health">🏃 Health</option>
                <option value="shopping">🛒 Shopping</option>
                <option value="learning">📚 Learning</option>
                <option value="other">🔧 Other</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-green-400 hover:bg-green-500 text-black font-black py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Task
            </motion.button>
            
            <motion.button
              type="button"
              onClick={handleClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-300 hover:bg-gray-400 text-black font-black py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] uppercase tracking-wide"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;
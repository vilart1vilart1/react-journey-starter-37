import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi } from '../services/api';
import { CalendarDays, Clock, MapPin, User, Users, Tag, Edit, Trash2, Link, File, ImagePlus, CheckCircle2, XCircle } from 'lucide-react';
import moment from 'moment';
import 'moment/locale/fr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../components/Modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';

moment.locale('fr');

interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  artist_id: number;
  artist_name: string;
  available_spots: number;
  total_spots: number;
  reservationNumbers: string[];
  tags: string[];
  image_url: string;
  files: { id: number; name: string; url: string; }[];
  links: { id: number; name: string; url: string; }[];
}

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [foundEvent, setFoundEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [availableSpots, setAvailableSpots] = useState(0);
  const [totalSpots, setTotalSpots] = useState(0);
  const [tags, setTags] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetchApi<Event>(`/events/${id}`);
      if (response.data) {
        setFoundEvent(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setStartDate(response.data.start_date);
        setEndDate(response.data.end_date);
        setLocation(response.data.location);
        setAvailableSpots(response.data.available_spots);
        setTotalSpots(response.data.total_spots);
        setTags(response.data.tags.join(', '));
        setImageUrl(response.data.image_url);
      } else {
        setError(response.error || 'Failed to fetch event');
      }
    } catch (err) {
      setError('Failed to fetch event');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openAddFileModal = () => {
    setIsAddFileModalOpen(true);
  };

  const closeAddFileModal = () => {
    setIsAddFileModalOpen(false);
  };

  const openAddLinkModal = () => {
    setIsAddLinkModalOpen(true);
  };

  const closeAddLinkModal = () => {
    setIsAddLinkModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNewFile(event.target.files[0]);
    }
  };

  const handleEditEvent = async () => {
    if (!id) return;

    const payload = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      location,
      available_spots: availableSpots,
      total_spots: totalSpots,
      tags: tags.split(',').map((tag: string) => tag.trim()),
      image_url: imageUrl,
    };

    try {
      const response = await fetchApi(`/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.data) {
        toast.success('Event updated successfully!');
        fetchEvent(id);
      } else {
        toast.error(response.error || 'Failed to update event');
      }
    } catch (error) {
      toast.error('Failed to update event');
    } finally {
      closeEditModal();
    }
  };

  const handleDeleteEvent = async () => {
    if (!id) return;

    try {
      const response = await fetchApi(`/events/${id}`, {
        method: 'DELETE',
      });

      if (response.data) {
        toast.success('Event deleted successfully!');
        navigate('/evenements');
      } else {
        toast.error(response.error || 'Failed to delete event');
      }
    } catch (error) {
      toast.error('Failed to delete event');
    } finally {
      closeDeleteModal();
    }
  };

  const handleAddFile = async () => {
    if (!id || !newFile) return;

    const formData = new FormData();
    formData.append('file', newFile);

    try {
      const response = await fetchApi(`/events/${id}/files`, {
        method: 'POST',
        body: formData as any,
      });

      if (response.data) {
        toast.success('File added successfully!');
        fetchEvent(id);
      } else {
        toast.error(response.error || 'Failed to add file');
      }
    } catch (error) {
      toast.error('Failed to add file');
    } finally {
      closeAddFileModal();
      setNewFile(null);
    }
  };

  const handleAddLink = async () => {
    if (!id || !newLinkName || !newLinkUrl) return;

    const payload = {
      name: newLinkName,
      url: newLinkUrl,
    };

    try {
      const response = await fetchApi(`/events/${id}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.data) {
        toast.success('Link added successfully!');
        fetchEvent(id);
      } else {
        toast.error(response.error || 'Failed to add link');
      }
    } catch (error) {
      toast.error('Failed to add link');
    } finally {
      closeAddLinkModal();
      setNewLinkName('');
      setNewLinkUrl('');
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    if (!id) return;

    try {
      const response = await fetchApi(`/events/${id}/files/${fileId}`, {
        method: 'DELETE',
      });

      if (response.data) {
        toast.success('File deleted successfully!');
        fetchEvent(id);
      } else {
        toast.error(response.error || 'Failed to delete file');
      }
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const handleDeleteLink = async (linkId: number) => {
    if (!id) return;

    try {
      const response = await fetchApi(`/events/${id}/links/${linkId}`, {
        method: 'DELETE',
      });

      if (response.data) {
        toast.success('Link deleted successfully!');
        fetchEvent(id);
      } else {
        toast.error(response.error || 'Failed to delete link');
      }
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading event details...</div>;
  }

  if (error || !foundEvent) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Error: {error || 'Event not found'}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{foundEvent.name}</h2>
          <div>
            <button onClick={openEditModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              <Edit className="inline-block mr-2" size={16} />Edit
            </button>
            <button onClick={openDeleteModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <Trash2 className="inline-block mr-2" size={16} />Delete
            </button>
          </div>
        </div>

        <div className="mb-4">
          <img src={foundEvent.image_url} alt={foundEvent.name} className="w-full h-64 object-cover rounded-md" />
        </div>

        <div className="mb-4">
          <p className="text-gray-300">{foundEvent.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center mb-2">
              <CalendarDays className="mr-2 text-gray-400" size={16} />
              <span>{moment(foundEvent.start_date).format('LL')} - {moment(foundEvent.end_date).format('LL')}</span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="mr-2 text-gray-400" size={16} />
              <span>{moment(foundEvent.start_date).format('LT')} - {moment(foundEvent.end_date).format('LT')}</span>
            </div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 text-gray-400" size={16} />
              <span>{foundEvent.location}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <User className="mr-2 text-gray-400" size={16} />
              <span>Artist: {foundEvent.artist_name}</span>
            </div>
            <div className="flex items-center mb-2">
              <Users className="mr-2 text-gray-400" size={16} />
              <span>{foundEvent.available_spots} / {foundEvent.total_spots} Spots Available</span>
            </div>
            <div className="flex items-center mb-2">
              <Tag className="mr-2 text-gray-400" size={16} />
              <span>Tags: {foundEvent.tags.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Reservations</h3>
          {foundEvent?.reservationNumbers?.length > 0 ? (
            <ul className="list-disc list-inside">
              {foundEvent.reservationNumbers.map((reservation, index) => (
                <li key={index}>{reservation}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Files</h3>
          <ul className="list-disc list-inside">
            {foundEvent.files.map(file => (
              <li key={file.id} className="flex items-center justify-between">
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 flex items-center">
                  <File className="mr-2" size={16} />
                  {file.name}
                </a>
                <button onClick={() => handleDeleteFile(file.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="inline-block" size={16} />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={openAddFileModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
            <ImagePlus className="inline-block mr-2" size={16} />Add File
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Links</h3>
          <ul className="list-disc list-inside">
            {foundEvent.links.map(link => (
              <li key={link.id} className="flex items-center justify-between">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 flex items-center">
                  <Link className="mr-2" size={16} />
                  {link.name}
                </a>
                <button onClick={() => handleDeleteLink(link.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="inline-block" size={16} />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={openAddLinkModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
            <Link className="inline-block mr-2" size={16} />Add Link
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Shareable Link</h3>
          <div className="flex items-center">
            <input
              type="text"
              value={`${window.location.origin}/evenements/${id}`}
              className="bg-gray-700 text-white rounded-md py-2 px-4 w-full mr-2"
              readOnly
            />
            <CopyToClipboard text={`${window.location.origin}/evenements/${id}`} onCopy={handleCopyToClipboard}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {isCopied ? <CheckCircle2 className="inline-block mr-2" size={16} /> : <Link className="inline-block mr-2" size={16} />}
                {isCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Event">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Description:</label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-300 text-sm font-bold mb-2">Start Date:</label>
          <input
            type="datetime-local"
            id="startDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={moment(startDate).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-300 text-sm font-bold mb-2">End Date:</label>
          <input
            type="datetime-local"
            id="endDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={moment(endDate).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-300 text-sm font-bold mb-2">Location:</label>
          <input
            type="text"
            id="location"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availableSpots" className="block text-gray-300 text-sm font-bold mb-2">Available Spots:</label>
          <input
            type="number"
            id="availableSpots"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={availableSpots}
            onChange={(e) => setAvailableSpots(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalSpots" className="block text-gray-300 text-sm font-bold mb-2">Total Spots:</label>
          <input
            type="number"
            id="totalSpots"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={totalSpots}
            onChange={(e) => setTotalSpots(parseInt(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-300 text-sm font-bold mb-2">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-300 text-sm font-bold mb-2">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleEditEvent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Update
          </button>
          <button onClick={closeEditModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Delete Event">
        <p className="text-gray-300">Are you sure you want to delete this event?</p>
        <div className="flex justify-end mt-4">
          <button onClick={handleDeleteEvent} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Delete
          </button>
          <button onClick={closeDeleteModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </Modal>

      <Modal isOpen={isAddFileModalOpen} onClose={closeAddFileModal} title="Add File">
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-300 text-sm font-bold mb-2">File:</label>
          <input
            type="file"
            id="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleAddFile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Add
          </button>
          <button onClick={closeAddFileModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </Modal>

      <Modal isOpen={isAddLinkModalOpen} onClose={closeAddLinkModal} title="Add Link">
        <div className="mb-4">
          <label htmlFor="linkName" className="block text-gray-300 text-sm font-bold mb-2">Link Name:</label>
          <input
            type="text"
            id="linkName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={newLinkName}
            onChange={(e) => setNewLinkName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkUrl" className="block text-gray-300 text-sm font-bold mb-2">Link URL:</label>
          <input
            type="text"
            id="linkUrl"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleAddLink} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Add
          </button>
          <button onClick={closeAddLinkModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EventDetail;

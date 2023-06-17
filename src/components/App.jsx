import { useEffect, useState, useRef } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './service/image-service';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import LoadMore from './Button/Button';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const per_page = 12;

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const targetElement = useRef(null);

  const lockScroll = () => {
    disableBodyScroll(targetElement.current);
  };

  const unlockScroll = () => {
    enableBodyScroll(targetElement.current);
  };

  useEffect(() => {
    targetElement.current = document.querySelector('#root');
    clearAllBodyScrollLocks();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) {
        setError('There is nothing in the search field');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await getImages(query, page);
        const arrImages = result.data.hits;
        const { totalHits } = result.data;

        if (page === 1) {
          if (!arrImages.length) {
            setIsEmpty(true);
          }
          setImages(arrImages);
          setIsShowButton(page < Math.ceil(totalHits / per_page));
          setTotalHits(totalHits);
        } else {
          setImages(prevImages => [...prevImages, ...arrImages]);
          setIsShowButton(page < Math.ceil(totalHits / per_page));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [query, page]);

  const handleSubmit = searchInput => {
    setQuery(searchInput);
    setPage(1);
    setIsEmpty(false);
  };

  const openModal = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    setIsModalOpen(true);
    lockScroll();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    unlockScroll();
  };

  const handleClickButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery arrImages={images} showModal={openModal} />
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal modalHide={closeModal} largeImageUrl={largeImageUrl}>
          <img src={largeImageUrl} alt="Ooops!" />
        </Modal>
      )}
      {isEmpty && <p>No images</p>}
      {error && <p>{error}</p>}
      {isShowButton && <LoadMore onClick={handleClickButton} />}
      {totalHits === images.length && <p>These are all pictures</p>}
    </div>
  );
};

export default App;

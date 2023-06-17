import PropTypes from 'prop-types';
import {
  SearchBar,
  StyledForm,
  SearchFormButton,
  SearchFormButtonLabel,
  StyledField,
  SearchIcon,
} from './Searchbar.styled';
import { Formik } from 'formik';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.searchInput);
    resetForm();
  };
  return (
    <SearchBar>
      <Formik initialValues={{ searchInput: '' }} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <StyledForm className="form" onSubmit={handleSubmit}>
            <SearchFormButton type="submit" className="button">
              <SearchIcon />
              <SearchFormButtonLabel className="button-label">
                Search
              </SearchFormButtonLabel>
            </SearchFormButton>

            <StyledField
              className="input"
              type="text"
              name="searchInput"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </StyledForm>
        )}
      </Formik>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

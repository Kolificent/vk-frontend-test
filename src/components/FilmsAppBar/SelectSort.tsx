import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@store';
import { SORT_OPTIONS } from '@constants';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { selectIsOrderAscending, selectSort } from '@selectors/pagination';
import { changeOrder, changeSort } from '@slices/paginationReducer';

const SORT_LABEL = 'Сортировать по';

function SelectSort() {
  const sort = useAppSelector(selectSort);
  const isOrderAscending = useAppSelector(selectIsOrderAscending);
  const dispatch = useAppDispatch();

  function handleChangeSort(e: SelectChangeEvent) {
    dispatch(changeSort(+e.target.value));
  }

  function handleOrderButton() {
    dispatch(changeOrder(!isOrderAscending));
  }

  return (
    <Box display="flex" alignItems="center" minWidth="200px" gap={1}>
      <FormControl fullWidth size="small" sx={{ color: 'white' }}>
        <InputLabel sx={{ color: 'white' }}>{SORT_LABEL}</InputLabel>
        <Select
          value={sort.toString()}
          label={SORT_LABEL}
          onChange={handleChangeSort}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSelect-icon': {
              color: 'white',
            },
            color: 'white',
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.id} id={option.name} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        onClick={handleOrderButton}
        color={isOrderAscending ? 'primary' : 'default'}
        sx={{ color: isOrderAscending ? 'white' : 'rgba(255, 255, 255, 0.54)' }}
      >
        <ImportExportIcon />
      </IconButton>
    </Box>
  );
}

export default SelectSort;

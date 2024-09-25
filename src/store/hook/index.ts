import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Store } from '../../types/store/store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<Store> = useSelector;

export { useAppDispatch, useAppSelector };

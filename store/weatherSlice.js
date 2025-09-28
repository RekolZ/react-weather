import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = (city) => async (dispatch) => {
  dispatch(fetchWeatherStart());
  try {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e8c1f053b2f0ced70c7096f12de601c3`
      )
      .then((response) => {
        dispatch(fetchHourlyWeatherSuccess(response.data));
      });
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e8c1f053b2f0ced70c7096f12de601c3`
      )
      .then((response) => {
        dispatch(fetchCurrentWeatherSuccess(response.data));
      });
  } catch (error) {
    dispatch(fetchWeatherError(error));
    console.error(error);
  }
};



const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    hourlyWeatherData: null,
    currentWeatherData: null,
    currentDay: 0,
    city: "Екатеринбург",
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
    },
    fetchHourlyWeatherSuccess(state, action) {
      state.loading = false;
      state.hourlyWeatherData = action.payload;
    },
    fetchCurrentWeatherSuccess(state, action) {
      state.loading = false;
      state.currentWeatherData = action.payload;
    },
    fetchWeatherError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setDay(state, action) {
      state.currentDay = action.payload - 1;
    },
  },
});

export const {
  fetchWeatherStart,
  fetchHourlyWeatherSuccess,
  fetchCurrentWeatherSuccess,
  fetchWeatherError,
  setDay,
  setCity,
} = weatherSlice.actions;

export default weatherSlice.reducer;

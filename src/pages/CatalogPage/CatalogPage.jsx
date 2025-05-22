import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/camper/operations.js";
import { selectCampers, selectIsLoading } from "../../redux/camper/selectors.js";
import { selectFilters } from "../../redux/filter/selectors.js";
import { setFilters } from "../../redux/filter/slice.js";

import FilterForm from "../../components/FilterForm/FilterForm.jsx";
import CatalogList from "../../components/CatalogList/CatalogList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const campers = useSelector(selectCampers);
  const filters = useSelector(selectFilters);

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const filteredCampers = useMemo(() => {
    let filtered = campers;
    if (filters && Object.keys(filters).length > 0) {
      filtered = campers.filter(camper => {
        let isValid = true;
        if (filters.vehicleType && camper.form !== filters.vehicleType) {
          isValid = false;
        }

        const equipmentFilters = [
          "AC", "TV", "bathroom", "kitchen", "gas",
          "radio", "water", "microwave", "refrigerator",
        ];
        for (const eq of equipmentFilters) {
          if (filters[eq] && !camper[eq]) {
            isValid = false;
          }
        }

        if (filters.location) {
          const normalizedInput = filters.location.toLowerCase().trim();
          const inputWords = normalizedInput.split(",").map(w => w.trim());
          const camperParts = camper.location.toLowerCase().trim().split(",").map(w => w.trim());

          const matches = inputWords.every(part =>
            camperParts.some(camperPart => camperPart.includes(part))
          );
          if (!matches) isValid = false;
        }

        return isValid;
      });
    }
    return filtered;
  }, [campers, filters]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const handleFilter = values => {
    dispatch(setFilters(values));
    setVisibleCount(5);
  };

  return (
    <div className={css.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FilterForm onFilter={handleFilter} />
          <CatalogList
            campers={filteredCampers}
            visibleCount={visibleCount}
            onLoadMore={handleLoadMore}
          />
        </>
      )}
    </div>
  );
}

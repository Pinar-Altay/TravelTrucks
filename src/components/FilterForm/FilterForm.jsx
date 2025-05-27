import { useId } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "../../redux/filter/selectors";
import { setFilters } from "../../redux/filter/slice";
import sprite from "../../icons/sprite.svg";
import css from "./FilterForm.module.css";


export default function FilterForm() {
  const id = useId();
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleSubmit = (values, actions) => {
    const normalizedLocation = values.location
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

    const filteredValues = {
      ...values,
      location: normalizedLocation,
    };

    dispatch(setFilters(filteredValues));
    actions.setSubmitting(false);
  };


  const vehicleEquipment = [
    { name: "AC", label: "AC", icon: "icon-ac" },
    { name: "automatic", label: "Automatic", icon: "icon-automatic" },
    { name: "kitchen", label: "Kitchen", icon: "icon-kitchen" },
    { name: "TV", label: "TV", icon: "icon-tv" },
    { name: "bathroom", label: "Bathroom", icon: "icon-shower" },
    { name: "radio", label: "Radio", icon: "icon-radio" },
    { name: "gas", label: "Gas", icon: "icon-gas" },
    { name: "microwave", label: "Microwave", icon: "icon-microwave" },
    { name: "refrigerator", label: "Refrigerator", icon: "icon-fridge" },
    { name: "water", label: "Water", icon: "icon-water" },
  ];

  const vehicleTypes = [
    // Burayı değiştirdim ⬇️
    // { value: "van", label: "Van", icon: "icon-l-grid" },
    { value: "panelTruck", label: "Van", icon: "icon-l-grid" },
    { value: "fullyIntegrated", label: "Fully Integrated", icon: "icon-m-grid" },
    { value: "alcove", label: "Alcove", icon: "icon-s-grid" },
  ];

  return (
    <Formik
      initialValues={filters}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className={css.sidebar}>
          {/* Location */}
          <label htmlFor={`${id}-location`} className={css.locationTitle}>
            Location
          </label>
          <div className={css.locationInput}>
            <svg className={css.iconMap}>
              <use href={`${sprite}#icon-map`} />
            </svg>
            <Field
              className={css.input}
              id={`${id}-location`}
              name="location"
              type="text"
              placeholder="City"
            />
          </div>

          {/* Filters */}
          <label className={css.filters}>Filters</label>

          <h2 className={css.vehicle}>Vehicle equipment</h2>
          <ul className={css.equipmentType}>
            {vehicleEquipment.map(filter => (
              <li
                key={filter.name}
                className={`${css.equipmentItem} ${
                  values[filter.name] ? css.active : ""
                }`}
              >
                <Field
                  type="checkbox"
                  id={`${id}-${filter.name}`}
                  name={filter.name}
                  className={css.fieldItem}
                />
                <label htmlFor={`${id}-${filter.name}`}>
                  <svg className={css.icon}>
                    <use href={`${sprite}#${filter.icon}`} />
                  </svg>
                  <p>{filter.label}</p>
                </label>
              </li>
            ))}
          </ul>

          <h2 className={css.vehicle}>Vehicle type</h2>
          <ul className={css.equipmentType}>
            {vehicleTypes.map(type => (
              <li
                key={type.value}
                className={`${css.equipmentItem} ${
                  values.vehicleType === type.value ? css.active : ""
                }`}
              >
                <Field
                  type="radio"
                  id={`${id}-${type.value}`}
                  name="vehicleType"
                  value={type.value}
                  checked={values.vehicleType === type.value}
                  className={css.fieldItem}
                  onChange={() => {
                    if (values.vehicleType === type.value) {
                      setFieldValue("vehicleType", "");
                    } else {
                      setFieldValue("vehicleType", type.value);
                    }
                  }}
                />
                <label htmlFor={`${id}-${type.value}`}>
                  <svg className={css.icon}>
                    <use href={`${sprite}#${type.icon}`} />
                  </svg>
                  <p>{type.label}</p>
                </label>
              </li>
            ))}
          </ul>

          <button type="submit" className={css.submitButton}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
}

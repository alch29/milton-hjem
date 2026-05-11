# Refactoring

The code has been refactored continuously throughout the project's development process. The team works in weekly sprints, where refactoring has taken place about once per sprint, but also generally during coding when necessary.

## DRY Principle with `useFormatDate`

An example of the use of the clean code principle DRY (Don't Repeat Yourself) can be seen in the `useFormatDate` composable. It exports a function called `formatDate`, which is used across multiple components to avoid duplicating code that essentially does the same thing.

```js
function formatDate(date) {
  if (!date) return '';
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}/${year}`;
}
```

This function is called wherever a dynamic date needs to be displayed in the format `DD/MM/YYYY`. For example, it is used in `ImageCategoriesView` on line 65, as shown below:

```html
<span class="images-categories-view__date">
  {{ formatDate(new Date(batch.uploadDate?.seconds * 1000)) }}
</span>
```

Before the `useFormatDate` composable was made, the `.toLocaleString()` method was used instead. While this worked, it did not return the desired format. The `formatDate` function had already been written for the timeline store, so rather than duplicating it in `ImageCategoriesView` (and other components), it was made into a composable during refactoring.
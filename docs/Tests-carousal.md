# Carousal of Products

## Unit Tests (Jest & React Testing Library)
---

1. Rendering the Carousel
Test: Ensure the carousel renders correctly.
Pass Requirement: The component should be present in the DOM and display at least one product with the correct image, title, and price, and the layout should not break.

2. API Integration Tests
Test: Ensure the recommendation API correctly fetches product data.
Pass Requirement: The API call should return a valid response containing a list of products with required fields (title, price, image, discount).

3. Product Card Display
Test: Ensure each product card displays the correct information (title, price, image).
Pass Requirement: Each card should show the correct title, price, and image URL from the API.

4. Color Selection (for products with multiple colors)
Test: Clicking a color option updates the product image.
Pass Requirement: The displayed image should update based on the selected color.

5. Discount Display Test
Test: Ensure discount information is displayed correctly.
Pass Requirement: If a product has a discount, it should show a price reduction message like "GET $10 AUD OFF".

6. Carousel Navigation (Left/Right Arrow Click)
Test: Clicking the next or previous button scrolls to the correct product.
Pass Requirement: The carousel should move to the next or previous product smoothly.

7. Wishlist Button Functionality
Test: Verify that clicking the heart icon adds/removes a product from the wishlist.
Pass Requirement: Clicking should toggle the product in the wishlist and update the UI accordingly.

8. Handling Empty API Response
Test: If the API returns no products, an appropriate message is displayed.
Pass Requirement: The component should show "No products available" or a placeholder.

9. Loading State
Test: Show a loading indicator while products are being fetched.
Pass Requirement: A loading spinner or message should appear before data is loaded.

10. Error Handling
Test: Display an error message when the API fails.
Pass Requirement: If the API request fails, a user-friendly error message (e.g., "Error fetching products") should be displayed.

11. Responsiveness Tests
Test: Verify that the carousel adapts correctly to different screen sizes (mobile, tablet, desktop).
Pass Requirement: The carousel should display a different number of products based on screen width and should not overflow or break.

12. Accessibility Tests
Test: Ensure the carousel is accessible via keyboard navigation and supports screen readers.
Pass Requirement: Users should be able to navigate the carousel with the keyboard (e.g., Tab key), and images should have alt text.

## End-to-End Tests (Cypress)

---
1. Full Page Load and Carousel Rendering
Test: Verify that the carousel loads correctly when visiting the page.
Pass Requirement: The page should load with the carousel displaying products.

2. API Call Verification
Test: Ensure that the recommendation API is called and returns expected data.
Pass Requirement: The API should return product details, and the UI should update accordingly.

3. Product Navigation (Arrow Clicks)
Test: Click the left and right arrows and verify product scrolling.
Pass Requirement: The carousel should move left or right with each button click.

4. Mobile Responsiveness
Test: Ensure that the carousel works properly on mobile devices.
Pass Requirement: Products should scroll correctly on small screens, and touch gestures should be supported.

5. Wishlist Persistence
Test: Add a product to the wishlist, refresh the page, and verify it remains saved.
Pass Requirement: The product should still be marked as "liked" after a page refresh.

6. Color Selection Retention
Test: Select a different color for a product and refresh the page.
Pass Requirement: The selected color should persist if the user navigates away and returns.

7. Carousel Autoplay
Test: Verify that the carousel auto-scrolls after a certain time.
Pass Requirement: The carousel should move automatically at set intervals if autoplay is enabled.

8. Edge Case: No Products Available
Test: Simulate an empty API response and check the UI.
Pass Requirement: The message "No products available" should be shown.

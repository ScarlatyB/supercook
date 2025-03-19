# Recipe API 🍽️

## 📌 Overview
This API allows users to upload images, process ingredient lists, and generate recipes.

## 🔗 Base URL
http://localhost:5001

_(Update this with the real production URL when deployed)_

---

## 📌 API Endpoints

### 1️⃣ Upload Image (from Nousha)
#### **POST** `/upload-image`
- **Description:** Accepts an image and processes it.
- **Request Body (Form-Data)**:
  | Key    | Type  | Required | Description  |
  |--------|-------|----------|--------------|
  | image  | file  | ✅ Yes   | The image file |

- **Example Request:**
  ```bash
  curl --location 'http://localhost:5001/upload-image' \
  --form 'image=@/path/to/file.jpg'
  Response Example:
(` ```json `)
{
  "message": "Image received successfully!",
  "filename": "uploaded_image.jpg"
}POST /send-ingredients
Description: Accepts a list of ingredients and forwards them.

Request Body (JSON):

(` ```json `)
{
  "ingredients": ["tomato", "onion", "garlic"]
}
Response Example:
{
  "message": "Ingredients received and sent to Scarlaty!",
  "ingredients": ["tomato", "onion", "garlic"]
}
POST /send-recipe
Description: Accepts a generated recipe and forwards it.

Request Body (JSON):
{
  "recipe": {
    "name": "Spaghetti Carbonara",
    "ingredients": ["pasta", "egg", "cheese"],
    "steps": ["Boil pasta", "Mix with egg and cheese"]
  }
}
Response Example:
{
  "message": "Recipe received and sent to Nousha!",
  "recipe": {
    "name": "Spaghetti Carbonara",
    "ingredients": ["pasta", "egg", "cheese"],
    "steps": ["Boil pasta", "Mix with egg and cheese"]
  }
}

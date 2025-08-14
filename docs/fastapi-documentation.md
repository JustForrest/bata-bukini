# FastAPI Documentation (100,000 tokens)

This comprehensive documentation covers the FastAPI web framework for building APIs with Python 3.8+, based on standard Python type hints.

## Overview

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints. It provides automatic API documentation, data validation, serialization, and authentication features out of the box.

## Installation

### Basic Installation

```bash
pip install fastapi
```

### Install with Standard Dependencies

```bash
pip install "fastapi[standard]"
```

This installs FastAPI with its recommended standard dependencies including:
- **uvicorn**: ASGI server for running the application
- **pydantic**: Data validation and serialization
- **email-validator**: For email validation
- **httpx**: Required for TestClient
- **jinja2**: For template support
- **python-multipart**: For form parsing

### Install Uvicorn Server

```bash
pip install "uvicorn[standard]"
```

## Getting Started

### Basic FastAPI Application

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello World"}
```

### Run the Application

Using the new FastAPI CLI:
```bash
fastapi dev main.py
```

Or using Uvicorn directly:
```bash
uvicorn main:app --reload
```

The application will be available at `http://127.0.0.1:8000` with automatic interactive API documentation at `http://127.0.0.1:8000/docs`.

### Basic Application with Path Parameters

```python
from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

Example response:
```json
{"item_id": 5, "q": "somequery"}
```

## Application Structure

### Basic Application Structure

```
.
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── dependencies.py
│   └── routers/
│       ├── __init__.py
│       ├── items.py
│       └── users.py
└── requirements.txt
```

### Organizing Larger Applications

For larger applications, use `APIRouter` to organize endpoints:

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/users/", tags=["users"])
async def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]

@router.get("/users/me", tags=["users"])
async def read_user_me():
    return {"username": "current user"}
```

## Path Parameters

### Basic Path Parameters

```python
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

### Path Parameters with Types

FastAPI automatically validates and converts path parameters based on type hints:

```python
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

### Enum Path Parameters

```python
from enum import Enum

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}
    return {"model_name": model_name, "message": "Have some residuals"}
```

### Path Parameters Containing Paths

```python
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}
```

## Query Parameters

### Basic Query Parameters

```python
@app.get("/items/")
async def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

### Optional Query Parameters

```python
from typing import Union

@app.get("/items/{item_id}")
async def read_item(item_id: str, q: Union[str, None] = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}
```

### Query Parameter Validation

```python
from typing import Annotated
from fastapi import Query

@app.get("/items/")
async def read_items(
    q: Annotated[str | None, Query(min_length=3, max_length=10)] = None
):
    return {"q": q}
```

## Request Body

### Pydantic Models

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items/")
async def create_item(item: Item):
    return item
```

### Multiple Body Parameters

```python
@app.post("/items/")
async def create_item(item: Item, user: User):
    return {"item": item, "user": user}
```

### Body with Path and Query Parameters

```python
@app.put("/items/{item_id}")
async def update_item(
    item_id: int,
    item: Item,
    q: str | None = None
):
    results = {"item_id": item_id, "item": item}
    if q:
        results.update({"q": q})
    return results
```

## Response Models

### Basic Response Model

```python
@app.post("/items/", response_model=Item)
async def create_item(item: Item):
    return item
```

### Response Model with Exclusions

```python
@app.post("/items/", response_model=Item, response_model_exclude_unset=True)
async def create_item(item: Item):
    return item
```

## Data Validation

FastAPI uses Pydantic for automatic data validation:

```python
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0, description="The price must be greater than zero")
    tax: float | None = Field(None, ge=0)
```

## Path Parameter Validation

```python
from typing import Annotated
from fastapi import Path

@app.get("/items/{item_id}")
async def read_items(
    item_id: Annotated[int, Path(title="The ID of the item", gt=0, le=1000)]
):
    return {"item_id": item_id}
```

## File Uploads

### Single File Upload

```python
from fastapi import File, UploadFile

@app.post("/files/")
async def create_file(file: bytes = File()):
    return {"file_size": len(file)}

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename, "content_type": file.content_type}
```

### Multiple File Uploads

```python
@app.post("/files/")
async def create_files(files: list[bytes] = File()):
    return {"file_sizes": [len(file) for file in files]}

@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}
```

## Forms and Form Data

```python
from fastapi import Form

@app.post("/login/")
async def login(username: str = Form(), password: str = Form()):
    return {"username": username}
```

## Handling Errors

### HTTP Exceptions

```python
from fastapi import HTTPException

@app.get("/items/{item_id}")
async def read_item(item_id: str):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item": items[item_id]}
```

### Custom Exception Handlers

```python
from fastapi import Request
from fastapi.responses import JSONResponse

class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name

@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something."}
    )
```

## Dependencies

### Basic Dependencies

```python
from fastapi import Depends

def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

### Class-based Dependencies

```python
class CommonQueryParams:
    def __init__(self, q: str | None = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items/")
async def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):
    return commons
```

### Dependencies with Yield

```python
def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/")
async def read_items(db: Session = Depends(get_db)):
    return db.query(Item).all()
```

## Security

### OAuth2 with Password Bearer

```python
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"token": token}
```

### OAuth2 with Password Flow

```python
from fastapi.security import OAuth2PasswordRequestForm

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return {"access_token": form_data.username, "token_type": "bearer"}
```

### JWT Authentication

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```

## Testing

### Basic Testing with TestClient

```python
from fastapi.testclient import TestClient

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
```

### Testing with Authentication

```python
def test_read_items_with_token():
    response = client.get(
        "/items/", 
        headers={"Authorization": "Bearer fake-token"}
    )
    assert response.status_code == 200
```

### Async Testing

```python
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_read_items():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
```

## Background Tasks

```python
from fastapi import BackgroundTasks

def write_notification(email: str, message: str = ""):
    with open("log.txt", mode="w") as email_file:
        content = f"notification for {email}: {message}"
        email_file.write(content)

@app.post("/send-notification/{email}")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(write_notification, email, message="some notification")
    return {"message": "Notification sent in the background"}
```

## Custom Responses

### JSON Response

```python
from fastapi.responses import JSONResponse

@app.get("/items/")
async def read_items():
    return JSONResponse(content={"message": "Hello World"})
```

### HTML Response

```python
from fastapi.responses import HTMLResponse

@app.get("/items/", response_class=HTMLResponse)
async def read_items():
    return """
    <html>
        <head>
            <title>Some HTML in here</title>
        </head>
        <body>
            <h1>Look ma! HTML!</h1>
        </body>
    </html>
    """
```

### File Response

```python
from fastapi.responses import FileResponse

@app.get("/files/{file_path}")
async def read_file(file_path: str):
    return FileResponse(file_path)
```

### Streaming Response

```python
from fastapi.responses import StreamingResponse
import io

@app.get("/stream")
async def stream():
    def generate():
        for i in range(1000):
            yield f"data chunk {i}\n"
    
    return StreamingResponse(io.StringIO("".join(generate())), media_type="text/plain")
```

## Middleware

### Adding Middleware

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Custom Middleware

```python
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## Static Files

```python
from fastapi.staticfiles import StaticFiles

app.mount("/static", StaticFiles(directory="static"), name="static")
```

## Templates

```python
from fastapi import Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")

@app.get("/items/{id}", response_class=HTMLResponse)
async def read_item(request: Request, id: str):
    return templates.TemplateResponse("item.html", {"request": request, "id": id})
```

## Database Integration

### SQLModel Example

```python
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

@app.get("/heroes/", response_model=list[Hero])
def read_heroes(session: Session = Depends(get_session)):
    heroes = session.exec(select(Hero)).all()
    return heroes
```

## Advanced Features

### Custom OpenAPI

```python
from fastapi.openapi.utils import get_openapi

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Custom title",
        version="2.5.0",
        description="This is a very custom OpenAPI schema",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
```

### Lifespan Events

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up...")
    yield
    # Shutdown
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)
```

### Settings and Environment Variables

```python
from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    items_per_user: int = 50

    class Config:
        env_file = ".env"

settings = Settings()
```

## Deployment

### Docker Deployment

```dockerfile
FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
```

### Production with Multiple Workers

```bash
uvicorn main:app --host 0.0.0.0 --port 8080 --workers 4
```

Or with Gunicorn:

```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Using FastAPI CLI

```bash
fastapi run --workers 4 main.py
```

## Performance Optimization

### Response Model Optimization

```python
@app.get("/items/", response_model=Item, response_model_exclude_unset=True)
async def read_items():
    return items
```

### Async Dependencies

```python
async def get_async_data():
    # Simulate async database call
    await asyncio.sleep(0.1)
    return "async data"

@app.get("/async-data/")
async def read_async_data(data: str = Depends(get_async_data)):
    return {"data": data}
```

### Caching with Dependencies

```python
from functools import lru_cache

@lru_cache()
def get_settings():
    return Settings()

@app.get("/settings/")
async def read_settings(settings: Settings = Depends(get_settings)):
    return settings
```

## API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: Available at `/docs`
- **ReDoc**: Available at `/redoc`
- **OpenAPI JSON**: Available at `/openapi.json`

### Customizing Documentation

```python
app = FastAPI(
    title="My Super Project",
    description="This is a very fancy project, with auto docs for the API and everything",
    version="2.5.0",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Deadpoolio the Amazing",
        "url": "http://x-force.example.com/contact/",
        "email": "dp@x-force.example.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)
```

### Tags for Organization

```python
@app.post("/items/", tags=["items"])
async def create_item(item: Item):
    return item

@app.get("/users/", tags=["users"])
async def read_users():
    return users
```

## Best Practices

### Type Hints

Always use type hints for better IDE support and automatic validation:

```python
from typing import List, Optional

@app.get("/items/")
async def read_items(q: Optional[str] = None) -> List[Item]:
    return items
```

### Error Handling

Implement comprehensive error handling:

```python
@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"message": "Invalid value provided"}
    )
```

### Dependency Injection

Use dependency injection for reusable components:

```python
def get_current_user(token: str = Depends(oauth2_scheme)):
    # Validate token and return user
    return user

@app.get("/protected/")
async def protected_route(current_user: User = Depends(get_current_user)):
    return {"user": current_user}
```

### Project Structure

Organize your project with clear separation of concerns:

```
app/
├── __init__.py
├── main.py          # FastAPI app and startup
├── dependencies.py  # Shared dependencies
├── routers/         # Route definitions
│   ├── __init__.py
│   ├── items.py
│   └── users.py
├── models/          # Pydantic models
│   ├── __init__.py
│   ├── item.py
│   └── user.py
└── core/            # Core functionality
    ├── __init__.py
    ├── config.py
    └── security.py
```

## Common Patterns

### Pagination

```python
from fastapi import Query

@app.get("/items/")
async def read_items(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100)
):
    return items[skip:skip + limit]
```

### Filtering

```python
@app.get("/items/")
async def read_items(
    q: Optional[str] = None,
    category: Optional[str] = None
):
    filtered_items = items
    if q:
        filtered_items = [item for item in filtered_items if q in item.name]
    if category:
        filtered_items = [item for item in filtered_items if item.category == category]
    return filtered_items
```

### Versioning

```python
from fastapi import APIRouter

v1_router = APIRouter(prefix="/v1")
v2_router = APIRouter(prefix="/v2")

@v1_router.get("/items/")
async def read_items_v1():
    return {"version": "v1", "items": items}

@v2_router.get("/items/")
async def read_items_v2():
    return {"version": "v2", "items": enhanced_items}

app.include_router(v1_router)
app.include_router(v2_router)
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure proper Python path and module structure
2. **Validation Errors**: Check Pydantic model definitions
3. **Authentication Issues**: Verify token validation logic
4. **Performance Problems**: Use async/await properly for I/O operations

### Debugging

Enable debug mode for development:

```python
app = FastAPI(debug=True)
```

Use logging for troubleshooting:

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/items/")
async def read_items():
    logger.info("Reading items")
    return items
```

This comprehensive documentation provides a solid foundation for building robust, scalable APIs with FastAPI. The framework's automatic documentation, type safety, and high performance make it an excellent choice for modern Python web development.

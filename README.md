# Columbus

Columbus is a school assignment where we build an unassuming Android application that sends location, audio, and image snapshots without much indication whatsoever on the phone itself. This piece of backend code basically just keeps track of all that data.

Media assets are pulled and queried from our S3 bucket.

## Note
It's far from perfect, because making it an actual product beyond the scope of the demo we're supposed to give is not our intention. This also happens to be my first Node project I am publishing here on Github so if you want to give some feedback, please do!

## Dependencies
- Node + Express
- Postgres
- PostGIS

## Documentation
### Users
#### List All
| Method | Route |
|--------|--------|
| GET  | /users |

Sample Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "email": "duncanleo97@gmail.com",
      "firstname": "Duncan",
      "lastname": "Leo"
    },
    {
      "id": 13,
      "email": "jurvistan@gmail.com",
      "firstname": "Jurvis",
      "lastname": "Tan"
    }
  ]
}
```
#### Get User By Id
| Method | Route |
|--------|--------|
| GET  | /users/get/id/{id} |

Sample Response (/api/users/get/id/2):
```json
{
  "success": true,
  "data": {
    "id": 2,
    "email": "duncanleo97@gmail.com",
    "firstname": "Duncan",
    "lastname": "Leo"
  }
}
```
#### Get User By Email
| Method | Route |
|--------|--------|
| GET  | /users/get/email/{email} |

Sample Response (/api/users/get/email/duncanleo97@gmail.com):
```json
{
  "success": true,
  "data": {
    "id": 2,
    "email": "duncanleo97@gmail.com",
    "firstname": "Duncan",
    "lastname": "Leo"
  }
}
```

#### Add User
| Method | Route |
|--------|--------|
| POST  | /users/add/ |

| Key | Required | Description |
|-----|----------| ----------- |
| email | required | user's email address |
| firstname | optional | user's first name |
| lastname | optional | user's last name |

Sample Response:
```json
{
  "success": true,
  "data": {
    "account_id": 15
  }
}
```

### Records
#### Adding a Record
| Method | Route |
|--------|--------|
| POST  | /records/add/ |

| Key | Required | Description |
|-----|----------| ----------- |
| timestamp | required | time and date now (2016-01-05T14:14:22+00:00) |
| account_id | required | the target user's account_id |
| location | required | the user's lat/lon location |
| audio_url | optional | url to audio file |
| image_url | optional | url to image file |

Sample response:
```json
{
  "success": true
}
```
#### Querying a User's Records
| Method | Route |
| ------ | ----- |
|  GET  | /records/get/ |

| Key | Required | Description |
| --- | -------- | ----------- |
| account_id | required | the user's account id |
| bounds | optional | urlValue string representation of the LatLngBounds returned by GMaps |
| from_datetime | optional | start time of location query |
| to_datetime | optional | end time of location query |

Sample Response:
```json
{
  "success": true,
  "data": [
    {
      "user_id": 12,
      "image_url": "",
      "audio_url": "",
      "daterecorded": "2016-01-10T19:59:58.000Z",
      "location": {
        "lat": 1.3104191,
        "lng": 103.7717208
      }
    },
    {
      "user_id": 12,
      "image_url": "",
      "audio_url": "",
      "daterecorded": "2016-01-11T11:03:42.000Z",
      "location": {
        "lat": 1.311857,
        "lng": 103.772037
      }
    }
  ]
}
```

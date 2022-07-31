## Getting Started

Prerequisites : `Python3, pip`


1. Create a virtual environment with venv (install virtualenv, if its not installed).

   #### For Linux/Mac OSX
    ```shell
    sudo apt-get install python3-venv
    python3 -m venv venv
    ```
  
   #### For Windows
    ```shell
    pip install virtualenv
    python -m venv venv
    ```


2. Activate the virtual environemnt.

    #### For Linux/Mac OSX

    ```
    source venv/bin/activate
    ```

    #### For Windows
    ```
    venv\Scripts\activate
    ```
   
3. Install the requirements.

    ```
    pip install -r requirements.txt
    ```
 
4. Run the Migrations

    ```
    python manage.py makemigrations
    python manage.py migrate
    ```

5. Run the server with development settings

    ```
    python3 manage.py runserver --settings=SecureDePaRT.dev-settings
    ```

6.  The Backend gets hosted by default at port 8000.

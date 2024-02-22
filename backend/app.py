from flask import Flask, jsonify, request, session
from flask_cors import CORS
import pymysql

app = Flask(__name__)
app.secret_key = 'njnjfrweadvgwedgwedse'
CORS(app)

# Replace 'username', 'password', 'host', 'port', and 'database_name' with your MySQL credentials and database information
db = pymysql.connect(host="localhost", user="root", password="BA822sV9gHM3F5jGoVUc", port=3306, database="shop")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    cursor = db.cursor()
    sql = "SELECT * FROM Users WHERE Email=%s"
    cursor.execute(sql, (email,))
    user = cursor.fetchone()
    print(user)

    if user and user[5] == password:  # Assuming the password is stored in the sixth column
        user_data = {
            "id": user[0],
            "first_name": user[1],
            "last_name": user[2],
            "username": user[3],
            "email": user[4],
            "password": user[5]
            # Add more fields as needed
        }
        session.permanent = True
        session['user'] = user_data
        return jsonify({"success": True, "message": "Login successful", "user": user_data})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    firstName = data.get('firstname')
    lastName = data.get('lastname')
    userName = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    print(firstName)
    print(lastName)
    print(userName)
    print(email)
    print(password)

    try:
        cursor = db.cursor()
        # Check if the user already exists
        cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            print("user already in DB")
            return jsonify({"success": False, "message": "User already exists"})
        elif not data:
            print("Data empty")
            return jsonify({"success": False, "message": "Fill in all the fields"})

        
        # If user does not exist, insert the new user
        Signup_user_data = {
            "first_name": firstName,
            "last_name": lastName,
            "username": userName,
            "email": email
            # Add more fields as needed
        }
        session.permanent = True
        session['user'] = Signup_user_data
        sql = "INSERT INTO Users (Firstname, Lastname, Username, Email, Password) VALUES (%s, %s, %s, %s,%s)"
        cursor.execute(sql, (firstName, lastName,userName, email, password))
        db.commit()
        return jsonify({"success": True, "message": "User added successfully", "user": Signup_user_data})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route("/allUsers")
def get_users():
    try:
        # Fetch products from the database
        cursor = db.cursor()

        cursor.execute("SELECT * FROM Users")
        users = cursor.fetchall()

        # Convert fetched data into a list of dictionaries
        user_list = []
        for user in users:
            user_list_dict = {
                "id": user[0],
                "firstName": user[1],
                "lastName": user[2],
                "userName": user[3],
                "email": user[4]

            }
            user_list.append(user_list_dict)

        # Return product data as JSON response
        return jsonify(user_list)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/getProducts")
def get_products():
    try:
        # Fetch products from the database
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Products")
        products = cursor.fetchall()

        # Convert fetched data into a list of dictionaries
        product_list = []
        for product in products:
            product_dict = {
                "id": product[0],
                "name": product[1],
                "price": product[2],
                "description": product[3]
            }
            product_list.append(product_dict)

        # Return product data as JSON response
        return jsonify(product_list)
    except Exception as e:
        return jsonify({"error": str(e)})



@app.route("/logout", methods=["GET"])
def logout():
    # Check if user is logged in
    print(session)
    if 'user' in session:
        # Clear user session data
        session.pop("user", None)
        return jsonify({"success": True, "message": "Logout successful"})
    else:
        return jsonify({"success": False, "message": "User not logged in"})


@app.route('/change_password', methods=['POST'])
def changePass():
    data = request.get_json()
    email = data.get('email')
    current_pass = data.get('currentPassword')
    new_pass = data.get('newPassword')
    conf_pass = data.get('confirmNewPassword')

    cursor = db.cursor()
    # Select the user with the given email
    sql = "SELECT * FROM Users WHERE Email=%s"
    cursor.execute(sql, (email,))
    user = cursor.fetchone()
    # print(user)

    # Check if user exists and if the current password matches
    if user and user[5] == current_pass:
        # Update the password
        update_sql = "UPDATE Users SET Password=%s WHERE Email=%s"
        cursor.execute(update_sql, (new_pass, email))
        db.commit()  # Commit the transaction
        print("PASSWORD UPDATED")
        return jsonify({"success": True, "message": "Password updated successfully"})
    else:
        return jsonify({"success": False, "message": "Invalid password"})

    

if __name__ == '__main__':
    app.run(debug=True)

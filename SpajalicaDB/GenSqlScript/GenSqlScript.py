from random import choice, randrange

print('hello')
with open('firstNames.txt') as f:
	firstNames = f.readlines()
f.close()

firstNames = [x.strip() for x in firstNames] 

with open('lastNames.txt') as f:
	lastNames = f.readlines()
f.close()
lastNames = [x.strip() for x in lastNames] 

with open('locations.txt') as f:
	locations = f.readlines()
f.close()
locations = [x.strip() for x in locations] 



for i in range(50):
	#INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES (3,'Marko','marko@gmail.com','marko');
	#INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES ('ТестниКорисникИме','ТестниКорисникПрезиме','1980-01-01','2017-01-15','М','Београд',1,NULL,'Самац');
	id = str(i+1)
	sex = choice(["M", "Z"])
	firstName = choice(firstNames)
	if sex == "Z":
		if firstName[-1] == "a" or firstName[-1] == "i" or firstName[-1] == "u":
			sex = "M"
			#print("changed sex (a, i, u)")
		elif firstName[-1] == "e" or firstName[-1] == "o":
			firstName = firstName[:-1] + "a"
			if firstName in firstNames:
				sex = "M"
				#print("changed sex and name (e, o)")
			#else:
				#print("now female (e, o)")
		else:
			firstName = firstName + "a"
			if firstName in firstNames:
				sex = "M"
				#print("changed sex and name (other)")
			#else:
				#print("now female (other)")	
	
	lastName = choice(lastNames)
	
	yearBorn = str(randrange(1960, 1999))
	monthBorn = str(randrange(1,12))
	if len(monthBorn) < 2:
		monthBorn = "0" + monthBorn
	dayBorn = str(randrange(1,28))
	if len(dayBorn) < 2:
		dayBorn = "0" + dayBorn
	dateBorn = yearBorn + "-" + monthBorn + "-" + dayBorn
	dayJoined = str(randrange(1,19))
	#if len(dayJoined) < 2:
	#	dayJoined = "0" + dayJoined
	#dateJoined = "2017-01-" + dayJoined
	location = choice(locations)
	nick = firstName[0:3] + lastName[0:3] + location[0:2] + yearBorn[2:] + monthBorn + dayBorn + id
	password = (firstName[0:3] + lastName[0:3] + location[0:2] + yearBorn[2:] + monthBorn + dayBorn + id).lower()
	email = (firstName[0] + lastName + location[0:2] + yearBorn[2:] + monthBorn + dayBorn + id + "@" + choice(["gmail", "yahoo", "hotmail", "msn"]) + ".com").lower()
	statusVeze = choice(["Samac" , "U vezi", "Komplikovano"])
	#debug = id + " " + firstName + " " + lastName + " " + sex + " " + location + " " + nick + " " + password + " " + email + " " + dateBorn + " " + dateJoined + " " + statusVeze
	#print(debug)
	sql1 = "INSERT INTO `logininfo` (`idloginInfo`,`userName`,`email`,`password`) VALUES (" + id + ",'" + nick + "','" + email + "','" + password + "');"
	#print(sql1)
	#sql2 = "INSERT INTO `usersinfo` (`firstName`,`lastName`,`birthDate`,`joinedDate`,`sex`,`location`,`idloginInfo`,`profilePicture`,`relationshipStatus`) VALUES ('" + firstName + "','" + lastName + "','" + dateBorn + "','" + dateJoined + "','" + sex + "','" + location + "'," + id + ",NULL,'" + statusVeze + "');"
	sql2 = "UPDATE `usersinfo` SET `firstName` = '" + firstName + "', `lastName` = '" + lastName + "', `birthDate` = '" + dateBorn + "', `sex` = '" + sex + "', `location` = '" + location + "', `relationshipStatus` = '" + statusVeze + "' WHERE `idloginInfo` = " + id + ";"
	#print(sql2)
	#print(i, choice(firstNames).strip(), choice(lastNames).strip())
	with open('tom.sql', 'a+') as f:
		f.write(sql1 + "\n")
		f.write(sql2 + "\n")
		f.write("\n")
	f.close()

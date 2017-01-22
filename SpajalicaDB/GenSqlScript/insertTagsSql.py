from random import choice, randrange



with open('userProfileTags_M.txt') as f:
	userProfileTags_M = f.readlines()
f.close()
userProfileTags_M = [x.strip() for x in userProfileTags_M] 

with open('userProfileTags_F.txt') as f:
	userProfileTags_F = f.readlines()
f.close()
userProfileTags_F = [x.strip() for x in userProfileTags_F] 

with open('tags.txt') as f:
	tags = f.readlines()
f.close()
tags = [x.strip() for x in tags] 

id_len = len(userProfileTags_M) + len(userProfileTags_F) + len(tags)
id = {}
for i in range(0,id_len):
	if i < len(userProfileTags_M):
		id[userProfileTags_M[i]] = i + 1
	elif i < len(userProfileTags_M) + len(userProfileTags_F):
		id[userProfileTags_F[i - len(userProfileTags_M)]] = i + 1
	else:
		id[tags[i - len(userProfileTags_M) - len(userProfileTags_F)]] = i + 1
		
for key in id.keys():
	sql_tags = "INSERT INTO `preferencetags`(`idpreferenceTags`, `preferenceName`) VALUES (" + str(id[key]) + ", '" + key + "');"
	with open('insertTagsSql.sql', 'a+') as f:
		f.write(sql_tags + "\n")
		f.write("\n")
f.close()

#INSERT INTO `preferencetags`(`idpreferenceTags`, `preferenceName`) VALUES (50, 'ruzan');
#INSERT INTO `userpreftag`(`idpreferenceTags`, `idloginInfo`, `value`) VALUES (50, 1, 10);
#INSERT INTO `userprofiletags`(`idloginInfo`, `idpreferenceTags`) VALUES (1, 50);



with open('tom.sql') as f:
	lines = f.readlines()
f.close()
lines = [x.strip() for x in lines] 


for i in range(1,51):
	#1 + 3*i
	#print(str(i))
	#print(str(1+ 3*i))
	#print(lines[1+ 3*i])
	if "'M'" in lines[1+ 3*(i-1)]:
		used = [0] * 5
		for j in range(5):
			aTag = choice(userProfileTags_M)
			tagId = id[aTag]
			while tagId in used:
				aTag = choice(userProfileTags_M)
				tagId = id[aTag] 
			used[j] = tagId
			sql_prof_tags = "INSERT INTO `userprofiletags`(`idloginInfo`, `idpreferenceTags`) VALUES (" + str(i) + ", " + str(tagId) + ");"
			with open('insertTagsSql.sql', 'a+') as f:
				f.write(sql_prof_tags + "\n")
				f.write("\n")
		f.close()
		used = [0] * 5
		for j in range(5):
			aTag = choice(userProfileTags_F)
			tagId = id[aTag]
			while tagId in used:
				aTag = choice(userProfileTags_F)
				tagId = id[aTag]
			used[j] = tagId
			tagValue = randrange(-10,10)
			sql_prof_tags = "INSERT INTO `userpreftag`(`idpreferenceTags`, `idloginInfo`, `value`) VALUES (" + str(tagId) + ", " + str(i) + ", " + str(tagValue) + ");"
			with open('insertTagsSql.sql', 'a+') as f:
				f.write(sql_prof_tags + "\n")
				f.write("\n")
		f.close()
	elif "'Z'" in lines[1+ 3*(i-1)]:
		used = [0] * 5
		for j in range(5):
			aTag = choice(userProfileTags_F)
			tagId = id[aTag]
			while tagId in used:
				aTag = choice(userProfileTags_F)
				tagId = id[aTag]
			used[j] = tagId
			sql_prof_tags = "INSERT INTO `userprofiletags`(`idloginInfo`, `idpreferenceTags`) VALUES (" +  str(i) + ", " + str(tagId) + ");"
			with open('insertTagsSql.sql', 'a+') as f:
				f.write(sql_prof_tags + "\n")
				f.write("\n")
		f.close()
		used = [0] * 5
		for j in range(5):
			aTag = choice(userProfileTags_M)
			tagId = id[aTag]
			while tagId in used:
				aTag = choice(userProfileTags_M)
				tagId = id[aTag]
			used[j] = tagId
			tagValue = randrange(-10,10)
			sql_prof_tags = "INSERT INTO `userpreftag`(`idpreferenceTags`, `idloginInfo`, `value`) VALUES (" + str(tagId) + ", " +  str(i) + ", " + str(tagValue) + ");"
			with open('insertTagsSql.sql', 'a+') as f:
				f.write(sql_prof_tags + "\n")
				f.write("\n")
		f.close()
	
	used = [0] * 5
	for j in range(5):
		aTag = choice(tags)
		tagId = id[aTag]
		while tagId in used:
			aTag = choice(tags)
			tagId = id[aTag]
		used[j] = tagId
		tagValue = randrange(-10,10)
		sql_prof_tags = "INSERT INTO `userpreftag`(`idpreferenceTags`, `idloginInfo`, `value`) VALUES (" + str(tagId) + ", " +  str(i) + ", " + str(tagValue) + ");"
		with open('insertTagsSql.sql', 'a+') as f:
			f.write(sql_prof_tags + "\n")
			f.write("\n")
	f.close()	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

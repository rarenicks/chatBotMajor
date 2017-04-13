from fuzzywuzzy import fuzz
data1 = open("ques.txt", 'r+')
data2 = open("ans.txt",'r+')
def reach ():
    a = input("Enter the question? ")
    print (a)
    if a == "Exit":
        return
    data1.write(str(a)+'\n')
    b = input("Enter the answer for "+a+" ")
    print (b)
    data2.write(str(b)+'\n'),
    reach()
decide = input("Press 1 for Training and 2 for chatting ! ")
if int(decide) == 1:
    reach()
decide=2
i = 0
predic = []
answers = []
if int(decide)==2:
    for u in data1:
        predic.append(u)
    for n in data2:
        answers.append(n)
        print(" All data loaded! ")
    print("Start by typing a message !")
    def call():
        inputer = input("You >>")
        for i in predic:
            if inputer+'\n'== i:
                #print (fuzz.ratio(inputer,i))
                index = predic.index(i)
                print ("Bot >> "+answers [index])
                call()
    call()

data1.close()
data2.close()

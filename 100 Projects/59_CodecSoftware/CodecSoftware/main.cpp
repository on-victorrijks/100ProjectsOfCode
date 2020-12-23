#include <iostream>
using namespace std;


string alphabet = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};

int letterPosition(string elements, char element) {

	int position = -1;
	int n = elements.length();
	int i = 0;
	while (i < n)
	{
		if (elements[i] == element) {
			position = i;
			break;
		}
		i++;
	}

	return position;
}

string cipher_substitution(float decrypt, string text, int decal) {
	
	string s = "";

	if (decrypt) {
		// Should decrypt


	} else {
		// Should encrypt

		string result = "";

		for (char& c : text) {
			
			int position = letterPosition(alphabet, c);

			if (position != -1) {
				int maxPosition = 25;
				int minPosition = 0;

				int tempPosition = position + decal;

				while ((tempPosition - maxPosition) > 0) {
					tempPosition -= maxPosition;
				}

				while (tempPosition < minPosition) {
					tempPosition += maxPosition;
				}

				char newLetter = alphabet[tempPosition];
				result += newLetter;
			}

		}
		return result;

	}


	return s;
}

int main() {

	float shouldDecrypt = false;
	string text = "hello";
	int decal = 22;

	cout << cipher_substitution(shouldDecrypt, text, decal) << endl;



	system("pause");
	return 0;
}


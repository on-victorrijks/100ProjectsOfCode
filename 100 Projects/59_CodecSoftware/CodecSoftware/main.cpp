#include <iostream>
#include <stdio.h>
#include <string> 
#include <ctype.h>
using namespace std;


string alphabet = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
const char* algorithms[2] = { "Caesar", "RSA" };

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
	
	string result = "";

	for (char const& c : text) {
			
		int position = letterPosition(alphabet, c);

		if (position != -1) {
			int maxPosition = 26;
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
		} else {
			result += c;
		}

	}

	return result;
}

void welcome() {
	cout << "Codec Software V1.0" << endl;
	cout << "Victor Rijks 2020" << endl;
}

void showAlgorithms() {
	for (int i = 0; i < 2; i++) {
		cout << i;
		cout << ": ";
		cout << algorithms[i] << endl;
	}
}

string convertToString(char* a, int size){
	int i;
	string s = "";
	for (i = 0; i < size; i++) {
		s = s + a[i];
	}
	return s;
}

int main() {

	int chosenAlgoIndex;
	char shouldDecryptLetter;
	string enteredText;
	int numberOfAlgorithms = sizeof(algorithms) / sizeof(algorithms[0]);
	float shouldDecrypt = false;


	welcome();
	showAlgorithms();

	// User choses algorithm
	while (true) {
		cout << "Enter the chosen algorithm index: ";
		cin >> chosenAlgoIndex;

		if (chosenAlgoIndex < numberOfAlgorithms && chosenAlgoIndex >= 0) {
			break;
		}
	}

	// User choses if he wants to encrypt/decrypt
	while (true){
		cout << "Do you want to encrypt a text ? (Y/N): ";
		cin >> shouldDecryptLetter;

		if (shouldDecryptLetter == 'Y') {
			shouldDecrypt = true;
			break;
		} else if (shouldDecryptLetter == 'N') {
			shouldDecrypt = false;
			break;
		}
	}

	// User enters text
	cout << "Enter the text: ";
	cin.ignore();
	getline(cin, enteredText);

	// lower enteredText
	for (int i = 0; i < enteredText.length(); i++) {
		enteredText[i] = tolower(enteredText[i]);
	}

	// Main program
	if (shouldDecrypt) {
		cout << "---------------Decrypted text---------------";
	} else {
		cout << "---------------Encrypted text---------------";
	}

	string chosenAlgo_str = algorithms[chosenAlgoIndex];

	if (chosenAlgo_str == "Caesar") {

		// Offset
		int decal_encryption = 0;
		cout << "Offset: ";
		cin >> decal_encryption;


		if (shouldDecrypt) {
			decal_encryption = -decal_encryption;
		}

		string result = cipher_substitution(shouldDecrypt, enteredText, decal_encryption);

		cout << result << endl;

	} else if (chosenAlgo_str == "RSA") {

		// ...

	}
	else {






	//system("pause");
	return 0;
}


from PIL import Image

def decode_image(image_path):
    # Open the image
    image = Image.open(image_path)
    pixels = image.load()

    # Initialize variables
    binary_data = ""
    width, height = image.size

    # Iterate over each pixel
    for y in range(height):
        for x in range(width):
            pixel = pixels[x, y]

            # Extract the LSBs from the RGB channels
            for channel in range(3):  # R, G, B
                binary_data += str(pixel[channel] & 1)

                # Check for the null terminator (8 zeros)
                if len(binary_data) % 8 == 0:
                    last_byte = binary_data[-8:]
                    if last_byte == "00000000":
                        # Convert binary data to the original message
                        message = ""
                        for i in range(0, len(binary_data) - 8, 8):
                            byte = binary_data[i:i+8]
                            message += chr(int(byte, 2))
                        return message

    return "No hidden message found."

# Example usage
image_path = "image_21742710991770.png"  # Replace with the path to your encoded image
decoded_message = decode_image(image_path)
print("Decoded message:", decoded_message)
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

// Quality setting (0-100, higher = better quality but larger files)
const JPEG_QUALITY = 80;
// Source and destination directories
const SOURCE_DIR = './public/img/img-original';
const OUTPUT_DIR = './public/img/image-optimized';

// Ensure output directory exists
fs.ensureDirSync(OUTPUT_DIR);

// Process function
async function processImage(filePath) {
  try {
    // Keep original filename, just change extension to .jpg
    const filename = path.basename(filePath);
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
    const outputPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.jpg`);
    
    // Skip if the file already exists and is newer than the source
    if (await fs.pathExists(outputPath)) {
      const srcStat = await fs.stat(filePath);
      const destStat = await fs.stat(outputPath);
      if (destStat.mtime > srcStat.mtime) {
        console.log(`Skipping already processed: ${filename}`);
        return;
      }
    }
    
    console.log(`Processing: ${filename}`);
    
    // Process the image
    await sharp(filePath)
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true }) // Use mozjpeg for better compression
      .toFile(outputPath);
      
    const origSize = (await fs.stat(filePath)).size;
    const newSize = (await fs.stat(outputPath)).size;
    const savings = ((origSize - newSize) / origSize * 100).toFixed(2);
    
    console.log(`Optimized: ${filename} - Saved ${savings}% (${(origSize/1024).toFixed(2)}KB → ${(newSize/1024).toFixed(2)}KB)`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Main function
async function optimizeImages() {
  try {
    // Find all image files
    const imageFiles = glob.sync(`${SOURCE_DIR}/**/*.{png,jpg,jpeg,gif,webp,JPG,JPEG,PNG}`, { nocase: true });
    console.log(`Found ${imageFiles.length} images to process`);
    
    // Process images in batches to avoid overwhelming the system
    const BATCH_SIZE = 5;
    for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
      const batch = imageFiles.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(file => processImage(file)));
    }
    
    console.log('Image optimization complete!');
  } catch (err) {
    console.error('Error during image optimization:', err);
  }
}

// Run the optimization
optimizeImages();
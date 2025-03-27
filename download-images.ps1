# Script to download placeholder images

# Define the image URLs and destination paths
$images = @(
    @{
        Url = "https://placehold.co/1200x630/9c27b0/ffffff/png?text=Advanced+MDX+Techniques";
        Destination = "public\images\blog\advanced-mdx.jpg"
    },
    @{
        Url = "https://placehold.co/1200x630/2196f3/ffffff/png?text=Interactive+Components";
        Destination = "public\images\blog\interactive.jpg"
    },
    @{
        Url = "https://placehold.co/1200x630/4caf50/ffffff/png?text=Hello+MDX";
        Destination = "public\images\hello-mdx.jpg"
    },
    @{
        Url = "https://placehold.co/1200x630/ff9800/ffffff/png?text=Next.js+Cover";
        Destination = "public\images\nextjs-cover.jpg"
    },
    @{
        Url = "https://placehold.co/1200x630/f44336/ffffff/png?text=Hello+World";
        Destination = "public\images\hello-world.jpg"
    }
)

# Create a web client
$webClient = New-Object System.Net.WebClient

# Download each image
foreach ($image in $images) {
    Write-Host "Downloading $($image.Url) to $($image.Destination)..."
    try {
        $webClient.DownloadFile($image.Url, $image.Destination)
        Write-Host "Download complete!" -ForegroundColor Green
    } catch {
        Write-Host "Error downloading $($image.Url): $_" -ForegroundColor Red
    }
}

Write-Host "All downloads complete!" -ForegroundColor Green 